import { Component, OnInit } from '@angular/core';
import { LotService } from 'src/app/services/lot.service';
import { FilterPipe } from './filter.pipe';
import { ExchangeRateService } from 'src/app/services/currency.service';
import { Lot } from 'src/app/models/lot.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  filterText: string = '';
  exchangeRate: number = 1;
  currency = '₴';
  products: Lot[] = [];

  constructor(private lotService: LotService, private exchangeRateService: ExchangeRateService) { }

  updatePrice(price: number): number {
    return price * this.exchangeRate;
  }

  ngOnInit(): void {
    this.lotService.lots$.subscribe((lots) => {
      this.products = lots;
      this.updatePrices();
    });

    // this.lotService.fetchLots();

    this.exchangeRateService.exchangeRate$.subscribe((rate) => {
      this.exchangeRate = rate;
      switch (this.exchangeRateService.currency) {
        case 'UAH':
          this.currency = '₴';
          break;
        case 'USD':
          this.currency = '$';
          break;
        case 'EUR':
          this.currency = '€';
          break;
      }
      this.updatePrices();
    });
  }

  updatePrices(): void {
    // Оновлення цін товарів
    this.products.forEach((lot) => {
      lot.exchangePrice = Number(this.updatePrice(lot.price).toFixed(2));
    });
  }
}