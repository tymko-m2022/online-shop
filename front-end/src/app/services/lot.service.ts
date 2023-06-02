import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Lot } from '../models/lot.model';


@Injectable({
  providedIn: 'root'
})
export class LotService {

  products: Lot[];

  private comments: { [slug: string]: string[] } = {};

  private commentsSubject = new BehaviorSubject<{ [slug: string]: string[] }>({});

  comments$ = this.commentsSubject.asObservable();

  constructor() { 
    this.products = this.dataLot;
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
  }

  set dataComments(item: { [slug: string]: string[] }){
    localStorage.setItem("comments", JSON.stringify(item)); 
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

