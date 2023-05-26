import { Component } from '@angular/core';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private lotService: LotService) {}

  products = this.lotService.products;
}
