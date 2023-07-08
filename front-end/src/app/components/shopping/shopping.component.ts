import { Component, OnDestroy } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { ExchangeRateService } from 'src/app/services/currency.service';


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnDestroy {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  hasItems: boolean = false;
  exchangeRate: number = 1;
  currency: string = "₴";

  private cartItemsSubscription: Subscription;

  constructor(private cartService: CartService, private exchangeRateService: ExchangeRateService) {
    this.cartItemsSubscription = this.cartService.cartItemsUpdated.subscribe(() => {
      this.cartItems = this.cartService.returnLot();
      this.calculateTotalPrice();
    });
  }

  updatePrice(price: number): number {
    return price * this.exchangeRate;
  }

  ngOnInit() {
    this.cartItems = this.cartService.returnLot();
    this.calculateTotalPrice();
    this.checkCartItems();
    this.exchangeRateService.exchangeRate$.subscribe((rate) => {
      this.exchangeRate = rate;
      switch (this.exchangeRateService.currency) {
        case "UAH":
          this.currency = "₴";
          break;
        case "USD":
          this.currency = "$";
          break;
        case "EUR":
          this.currency = "€";
          break;
      }
      this.updatePrices();
    });
  }

  updatePrices(): void {
    this.cartItems.forEach((cartItem) => {
      cartItem.exchangePrice = Number(this.updatePrice(cartItem.price).toFixed(2));
    });
    this.calculateTotalPrice();
  }

  checkCartItems(): void {
    this.hasItems = this.cartItems.length > 0;
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return Number((total + (item.exchangePrice * item.quantity)).toFixed(2));
    }, 0);
  }

  placeOrder() {
    this.sendingAnOrder(this.formingAnOrder());
    this.cartService.clearCart();
    this.cartItems = this.cartService.returnLot();
    this.calculateTotalPrice();
    this.checkCartItems();
  }

  ngOnDestroy() {
    this.cartItemsSubscription.unsubscribe();
  }

  //Формування замовлення для телеграмм

  formingAnOrder() {
    const fullOrder: Array<object> = this.cartService.returnLot();
    let sliceOrder: string = fullOrder.reduce((acc, element, index) => {
      if (('name' in element) && ('quantity' in element) && ('exchangePrice' in element)) {
          acc += `Лот № ${index+1}: ${element.name} у кількості ${element.quantity} од. із загальною вартістю ${Number(element.quantity)*Number(element.exchangePrice)} ${this.currency}\n`;
      }
      return acc
    },'');
    sliceOrder += `Загальна вартість замовлення: ${this.totalPrice} ${this.currency}`;
    return sliceOrder
  }

  //Відправлення замовлення

  sendingAnOrder(message: string) {
    console.log(message);
  }
}
