import { Injectable, PipeTransform } from '@angular/core';
import { Promotion } from '../interfaces/promotion-interface';
import { PROMOTIONS } from '../data/promotions-mocked';
import { SortColumn, SortDirection } from '../directives/sortable.directive';
import { BehaviorSubject, Observable, Subject, debounceTime, delay, of, switchMap, tap } from 'rxjs';


const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0)
function sort(promotions: Promotion[], column: SortColumn, direction: string){
  if (direction === '' || column === '') {
    return promotions;
  } else {
    return [...promotions].sort((a, b) =>{
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(promotion: Promotion, term: string) {
  return (
    promotion.name.toLowerCase().includes(term.toLowerCase()) ||
    promotion.target.toLowerCase().includes(term.toLowerCase())
  )
}

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _promotions$ = new BehaviorSubject<Promotion[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    sortColumn: '',
    sortDirection: '',
    searchTerm: '',
    page: 1,
    pageSize: 5
  };

  constructor() { 
    this._search$
    .pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false)),
    )
    .subscribe(result => {
      this._promotions$.next(result.promotions);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get promotions$() {
    return this._promotions$.asObservable();
  }

  get total$() {
    return this._total$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  get page() {
    return this._state.page;
  }

  get pageSize() {
    return this._state.pageSize;
  }

  set page(page: number) {
    this._set({page});
  }

  set pageSize(pageSize: number) {
    this._set({pageSize});
  }

  set sortColumn(sortColumn: SortColumn) {
    this._set({sortColumn});
  }

  set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}

  set sortDirection(sortDirection: SortDirection) {
    this._set({sortDirection});
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult>{
    const {sortColumn, sortDirection, searchTerm, page, pageSize} = this._state;

    //sort
    let promotions = sort(PROMOTIONS, sortColumn, sortDirection);
    
    //filter
    promotions = promotions.filter((promotion) => matches(promotion, searchTerm));
    const total = promotions.length;

    //paginate
    promotions = promotions.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    
    return of({promotions, total})
  }
}

interface SearchResult {
  promotions: Promotion[];
  total: number;
}

interface State {
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  searchTerm: string;
  page: number;
  pageSize: number;
}
