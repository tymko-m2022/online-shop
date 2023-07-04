import { Component, OnInit } from '@angular/core';
import { LotService } from 'src/app/services/lot.service';
import { FilterPipe } from './filter.pipe';
import { ExchangeRateService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  filterText: string = '';
  exchangeRate: number = 1;

  constructor(private lotService: LotService, private exchangeRateService: ExchangeRateService) { }

  products = this.lotService.products ? this.lotService.products : [];

  updatePrice(price: number): number {
    return price * this.exchangeRate;
  }

  ngOnInit(): void {
    this.exchangeRateService.exchangeRate$.subscribe((rate) => {
      this.exchangeRate = rate;
      this.updatePrices();
    });
  }

  updatePrices(): void {
    // Оновлення цін товарів
    this.products.forEach((product) => {
      product.exchangePrice = this.updatePrice(product.price);
    });
  }
}
