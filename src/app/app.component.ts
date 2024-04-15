import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PromoTableComponent } from "./components/promo-table/promo-table.component";
import { TdFormComponent } from './components/td-form/td-form.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, TdFormComponent]
})
export class AppComponent {
  title = 'filter-table';
}
