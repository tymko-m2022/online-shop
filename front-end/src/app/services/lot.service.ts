import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lot } from '../models/lot.model';
import { CartService } from './cart.service';


@Injectable({
  providedIn: 'root'
})
export class LotService {

  products: Lot[];

  private comments: { [slug: string]: string[] } = {};

  private commentsSubject = new BehaviorSubject<{ [slug: string]: string[] }>({});

  comments$ = this.commentsSubject.asObservable();

  constructor(private cartService: CartService) { 
    this.products = this.dataLot;
    this.comments = this.dataComments;
  }

  set dataLot(item: Lot[]){
    localStorage.setItem("data", JSON.stringify(item)) 
  }

  get dataLot(): Lot[] {
    const data = localStorage.getItem("data");
    return data ? JSON.parse(data) : [];
  }

  returnLots(): Lot[]{
    return this.products;
  }

  addLots(lot: Lot): void{
    this.products.push(lot);
    this.dataLot = this.products;
  }

  removeLot(index: number): void{
    const removedProduct = this.products.splice(index, 1)[0];
    delete this.comments[removedProduct.slug];
    this.dataLot = this.products;
    this.dataComments = this.comments;
    this.commentsSubject.next(this.comments);
    this.cartService.removeFromCart(removedProduct);
  }

  set dataComments(item: { [slug: string]: string[] }){
    const stringifiedItem = JSON.stringify(
      Object.keys(item).reduce((acc, key) => {
        acc[key.toString()] = item[key];
        return acc;
      }, {} as { [slug: string]: string[] })
    );
    localStorage.setItem("comments", stringifiedItem); 
  }

  get dataComments(): { [slug: string]: string[] } {
    const data = localStorage.getItem("comments");
    return data ? JSON.parse(data) : [];
  }

  getCommentsBySlug(slug: string): string[] {
    return this.comments[slug] || [];
  }

  addComment(slug: string, comment: string): void{
    if (this.comments[slug]) {
      this.comments[slug].push(comment);
    } else {
      this.comments[slug] = [comment];
    }
    this.dataComments = this.comments;
    this.commentsSubject.next(this.comments);
  }

}

