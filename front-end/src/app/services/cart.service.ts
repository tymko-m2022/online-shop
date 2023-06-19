import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartItemsUpdated: Subject<void> = new Subject<void>();
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    this.cartItems = this.dataCart;
    this.cartCountSubject.next(this.calculateTotalQuantity());
  }

  set dataCart(item: CartItem[]){
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

  returnLot(): CartItem[]{
    return this.cartItems;
  }

  plusQuantity(item: CartItem): void{
    const existingItem = this.cartItems.find((cartItem) => cartItem.slug === item.slug);
    if (existingItem) {
      existingItem.quantity++;
    }
    this.cartCountSubject.next(this.calculateTotalQuantity());
    this.dataCart = this.cartItems;
    this.cartItemsUpdated.next();
  }

  minusQuantity(item: CartItem): void{
    const existingItem = this.cartItems.find((cartItem) => cartItem.slug === item.slug);
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity--;
      this.cartCountSubject.next(this.calculateTotalQuantity());
      this.dataCart = this.cartItems;
      this.cartItemsUpdated.next();
    }
  }

  clearCart():void{
    this.cartItems = [];
    this.cartCountSubject.next(this.calculateTotalQuantity());
    this.dataCart = this.cartItems;
    this.cartItemsUpdated.next();
  }
  
}
