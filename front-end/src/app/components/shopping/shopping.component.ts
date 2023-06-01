import { Component, OnDestroy } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnDestroy {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  private cartItemsSubscription: Subscription;

  constructor(private cartService: CartService){
    this.cartItemsSubscription = this.cartService.cartItemsUpdated.subscribe(() => {
      this.cartItems = this.cartService.returnLot();
      this.calculateTotalPrice();
    });
  }

  ngOnInit() {
    this.cartItems = this.cartService.returnLot();
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
  
  placeOrder(){
    this.cartService.clearCart();
    this.cartItems = this.cartService.returnLot();
    this.calculateTotalPrice()
  }

  ngOnDestroy() {
    this.cartItemsSubscription.unsubscribe();
  }
}
