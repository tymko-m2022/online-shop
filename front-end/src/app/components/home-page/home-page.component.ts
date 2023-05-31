import { Component, Input } from '@angular/core';
import { LotService, Lot } from 'src/app/services/lot.service';
import { FilterPipe } from './filter.pipe';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  filterText: string = '';

  constructor(private lotService: LotService) {}

  products = this.lotService.products ? this.lotService.products : [];
}
