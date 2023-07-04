import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  currency: string = "UAH";
  private exchangeRateSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  exchangeRate$ = this.exchangeRateSubject.asObservable();

  private exchangeRates: { [currencyPair: string]: number } = {
    'UAH-USD': 0.027,
    'UAH-EUR': 0.025
  };

  constructor() {
    this.updateExchangeRate();
  }

  getExchangeRate(currencyPair: string): number {
    const selectedCurrencyPair = `UAH-${currencyPair}`;
    return this.exchangeRates[selectedCurrencyPair] || 1; // Повертаємо 1, якщо курс обміну не знайдений
  }

  updateCurrency(currency: string): void {
    this.currency = currency;
    this.updateExchangeRate();
  }

  private updateExchangeRate(): void {
    const currencyPair = this.currency;
    const exchangeRate = this.getExchangeRate(currencyPair);
    this.exchangeRateSubject.next(exchangeRate);
  }
}