import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LotService {

  products: Lot[];

  constructor() { 
    this.products = this.dataLot;
  }

  set dataLot(item: any){
    localStorage.setItem("data", JSON.stringify(item)) 
  }

  get dataLot(): Lot[] {
    const data = localStorage.getItem("data");
    return data ? JSON.parse(data) : [];
  }

  returnLots(): Lot[]{
    return this.products
  }

  addLots(lot: Lot): void{
    this.products.push(lot);
    this.dataLot = this.products;
  }

  removeLot(index: number):void{
    this.products.splice(index, 1);
    this.dataLot = this.products;
  }
}

export class Lot {
  slug: string;
  name: string;
  desc: string;
  price: number;
  img: string;
  [key: string]: any;

  constructor(){
    this.slug = "";
    this.name = "";
    this.desc = "";
    this.price = 0;
    this.img = "";
  }
}
