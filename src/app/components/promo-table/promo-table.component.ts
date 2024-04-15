import { Component, QueryList, ViewChildren } from '@angular/core';
import { Promotion } from '../../interfaces/promotion-interface';
import { CommonModule } from '@angular/common';
import { SortEvent, SortableDirective, SortDirection, SortColumn } from '../../directives/sortable.directive';
import { Observable } from 'rxjs';
import { PromotionService } from '../../services/promotion.service';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promo-table',
  standalone: true,
  imports: [
    CommonModule, 
    SortableDirective, 
    FormsModule, 
    NgbHighlight,
    NgbPaginationModule
  ],
  templateUrl: './promo-table.component.html',
  styleUrl: './promo-table.component.scss'
})
export class PromoTableComponent {
  promotions$!: Observable<Promotion[]>
  total$!: Observable<number>

  sortValues: SortValues = { direction: '', column: '' };

  ngOnInit(): void {
    Swal.fire("SweetAlert2 is working!");
  }

  @ViewChildren(SortableDirective) headers!: QueryList<SortableDirective>;

  constructor(public service: PromotionService) { 
    this.promotions$ = service.promotions$;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
    this.sortValues = { direction, column };
  }

}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

interface SortValues {
  direction: SortDirection,
  column: SortColumn
}