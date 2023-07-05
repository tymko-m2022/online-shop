import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  currency: string;
  private exchangeRateSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  exchangeRate$ = this.exchangeRateSubject.asObservable();

  private exchangeRates: { [currencyPair: string]: number } = {
    'UAH-USD': 0.027,
    'UAH-EUR': 0.025
  };

  constructor() {
    this.currency = this.dataCurrency;
    this.updateExchangeRate();
  }

  set dataCurrency(item: string) {
    localStorage.setItem("currency", JSON.stringify(item));
  }

  get dataCurrency(): string {
    const data = localStorage.getItem("currency");
    return data ? JSON.parse(data) : "UAH";
  }

  getExchangeRate(currencyPair: string): number {
    const selectedCurrencyPair = `UAH-${currencyPair}`;
    return this.exchangeRates[selectedCurrencyPair] || 1;
  }

  updateCurrency(currency: string): void {
    this.currency = currency;
    this.updateExchangeRate();
    this.dataCurrency = this.currency;
  }

  private updateExchangeRate(): void {
    const currencyPair = this.currency;
    const exchangeRate = this.getExchangeRate(currencyPair);
    this.exchangeRateSubject.next(exchangeRate);
  }
}