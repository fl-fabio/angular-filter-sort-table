import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PromoTableComponent } from "./components/promo-table/promo-table.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, PromoTableComponent]
})
export class AppComponent {
  title = 'filter-table';
}
