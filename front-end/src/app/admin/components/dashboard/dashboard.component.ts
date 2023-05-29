import { Component } from '@angular/core';
import { LotService, Lot } from 'src/app/services/lot.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  products: Lot[]

  product: Lot;

  constructor(private lotService: LotService){
    this.product = new Lot();
    this.products = this.lotService.products ? this.lotService.returnLots() : [];
  }

  changeField(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;
    this.product[name] = value;
  }

  addLot(){
    // let boolCheck = true;
    // for (const item in this.product) {
    //   console.log()
    //   if(item === ""){
    //     boolCheck = false;
    //   }
    // }
    // if(boolCheck){
      this.lotService.addLots(this.product)
      this.product = new Lot();
    // }
  }

  removeLot(index: number){
    this.lotService.removeLot(index)
  }

  
}
