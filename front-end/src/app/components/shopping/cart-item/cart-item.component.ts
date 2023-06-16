import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter  } from '@angular/core';
import { CartItem, DEFAULT_CART_ITEM } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnChanges{
  @Input() cartItem: CartItem = DEFAULT_CART_ITEM;
  @Output() updateCheck: EventEmitter<void> = new EventEmitter<void>();
  price: number = 0;

  constructor(private cartService: CartService){ }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['cartItem'] && changes['cartItem'].currentValue){
      this.updatePrice();
    }
  }

  private updatePrice(){
    this.price = this.cartItem.price * this.cartItem.quantity;
  }

  removeFromCart(){
    this.cartService.removeFromCart(this.cartItem);
    this.updateCheck.emit();
  }

  minusQuantity(){
    this.cartService.minusQuantity(this.cartItem);
    this.updatePrice();
    this.updateCheck.emit();
  }

  plusQuantity(){
    this.cartService.plusQuantity(this.cartItem);
    this.updatePrice();
    this.updateCheck.emit();
  }
}
