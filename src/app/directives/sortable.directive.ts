import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Promotion } from '../interfaces/promotion-interface';

export type SortColumn = keyof Promotion | '';
export type SortDirection = 'asc' | 'desc' | '';
export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

const rotate: {[key: string]: SortDirection}= {
  'asc': 'desc',
  'desc': '',
  '': 'asc'
};

@Directive({
  selector: 'th[sortable]',
  standalone: true,
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class SortableDirective {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
