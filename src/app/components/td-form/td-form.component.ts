import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiValidatorDirective } from '../../directives/multi-validator.directive';

@Component({
  selector: 'app-td-form',
  standalone: true,
  imports: [ FormsModule, MultiValidatorDirective],
  templateUrl: 'td-form.component.html',
  styleUrl: 'td-form.component.scss',
})
export class TdFormComponent {
  text = '';

  logInput(inputRef: any) {
    console.log(inputRef);
  }
}
