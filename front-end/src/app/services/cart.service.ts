import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { LotService } from './lot.service';
import { ExchangeRateService } from 'src/app/services/currency.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartItemsUpdated: Subject<void> = new Subject<void>();
  cartCount$ = this.cartCountSubject.asObservable();
  exchangeRate: number = 1;
  currency = '₴';

  constructor(private lotService: LotService, private exchangeRateService: ExchangeRateService) {
    this.cartItems = this.dataCart;
    this.cartCountSubject.next(this.calculateTotalQuantity());
  }

  updatePrices(): void {
    // Оновлення цін товарів
    this.cartItems.forEach((lot) => {
      lot.exchangePrice = Number(this.updatePrice(lot.price).toFixed(2));
    });
  }

  updatePrice(price: number): number {
    return price * this.exchangeRate;
  }

  updateCartItemsWithLotsData(lots: any[]): void {
    const updatedCartItems = this.cartItems.filter((cartItem) => {
      return lots.some((lot) => lot.slug === cartItem.slug);
    });
    this.cartItems = updatedCartItems;
    this.cartItems.forEach((item) => {
      const correspondingLot = lots.find((lot) => lot.slug === item.slug);
      if (correspondingLot) {
        item.name = correspondingLot.name;
        item.price = correspondingLot.price;
        item.img = correspondingLot.img;
        item.exchangePrice = correspondingLot.exchangePrice;
      }
    });
    this.cartCountSubject.next(this.calculateTotalQuantity());
    this.dataCart = this.cartItems;
    this.cartItemsUpdated.next();
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

  // checkCartItemsAvailability(): void {
  //   this.lotService.lots$.subscribe((lots) => {
  //     console.log(lots)
  //     const updatedCartItems = this.cartItems.filter((cartItem) => {
  //       return lots.some((lot) => lot.slug === cartItem.slug);
  //     });
  //     this.cartItems = updatedCartItems;
  //     this.cartItems.forEach((item) => {
  //       const correspondingLot = lots.find((lot) => lot.slug === item.slug);
  //       if (correspondingLot) {
  //         item.name = correspondingLot.name;
  //         item.price = correspondingLot.price;
  //         item.exchangePrice = correspondingLot.exchangePrice;
  //       }
  //     });
  //     this.cartCountSubject.next(this.calculateTotalQuantity());
  //     this.dataCart = this.cartItems;
  //     this.cartItemsUpdated.next();
  //   });
  // }

  set dataCart(item: CartItem[]) {
    localStorage.setItem("dataCart", JSON.stringify(item))
  }

  get dataCart(): CartItem[] {
    const data = localStorage.getItem("dataCart");
    return data ? JSON.parse(data) : [];
  }

  addToCart(item: CartItem) {
    const existingItem = this.cartItems.find((cartItem) => cartItem.slug === item.slug);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem = { ...item, quantity: 1 };
      this.cartItems.push(newItem);
    }
    this.cartCountSubject.next(this.calculateTotalQuantity());
    this.dataCart = this.cartItems;
    this.cartItemsUpdated.next();
  }

  removeFromCart(item: any) {
    const existingItemIndex = this.cartItems.findIndex((cartItem) => cartItem.slug === item.slug);
    if (existingItemIndex !== -1) {
      this.cartItems.splice(existingItemIndex, 1);
      this.cartCountSubject.next(this.calculateTotalQuantity());
      this.dataCart = this.cartItems;
      this.cartItemsUpdated.next();
    }
  }

  calculateTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  returnLot(): CartItem[] {
    return this.cartItems;
  }

  plusQuantity(item: CartItem): void {
    const existingItem = this.cartItems.find((cartItem) => cartItem.slug === item.slug);
    if (existingItem) {
      existingItem.quantity++;
    }
    this.cartCountSubject.next(this.calculateTotalQuantity());
    this.dataCart = this.cartItems;
    this.cartItemsUpdated.next();
  }

  minusQuantity(item: CartItem): void {
    const existingItem = this.cartItems.find((cartItem) => cartItem.slug === item.slug);
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity--;
      this.cartCountSubject.next(this.calculateTotalQuantity());
      this.dataCart = this.cartItems;
      this.cartItemsUpdated.next();
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartCountSubject.next(this.calculateTotalQuantity());
    this.dataCart = this.cartItems;
    this.cartItemsUpdated.next();
  }

}
