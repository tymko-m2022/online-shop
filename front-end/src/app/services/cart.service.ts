import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    this.cartItems = this.dataCart;
    this.cartCountSubject.next(this.calculateTotalQuantity());
  }

  set dataCart(item: any){
    localStorage.setItem("dataCart", JSON.stringify(item)) 
  }

  get dataCart(): any[] {
    const data = localStorage.getItem("dataCart");
    return data ? JSON.parse(data) : [];
  }

  addToCart(item: any) {
    const existingItem = this.cartItems.find((cartItem) => cartItem.slug === item.slug);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem = { ...item, quantity: 1 };
      this.cartItems.push(newItem);
    }
    this.cartCountSubject.next(this.calculateTotalQuantity());
    this.dataCart = this.cartItems;
  }

  removeFromCart(item: any) {
    const existingItemIndex = this.cartItems.findIndex((cartItem) => cartItem.slug === item.slug);
    if (existingItemIndex !== -1) {
      this.cartItems.splice(existingItemIndex, 1);
      this.cartCountSubject.next(this.calculateTotalQuantity());
      this.dataCart = this.cartItems;
    }
  }

  calculateTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
  
}
