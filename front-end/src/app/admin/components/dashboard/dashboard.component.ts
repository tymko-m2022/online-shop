import { Component } from '@angular/core';
import { LotService, Lot } from 'src/app/services/lot.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  products: Lot[]

  product: Lot;

  validSlug: boolean = false;
  validName: boolean = false;
  validPrice: boolean = false;
  validDesc: boolean = false;
  validImg: boolean = false;
  hideBtn: boolean = false;

  validWarnSlug: boolean = true;
  validWarnName: boolean = true;
  validWarnPrice: boolean = true;
  validWarnDesc: boolean = true;
  validWarnImg: boolean = true;

  constructor(private lotService: LotService, private http: HttpClient){
    this.product = new Lot();
    this.products = this.lotService.products ? this.lotService.returnLots() : [];
  }

  async changeField(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;
    switch (name) {
      case "slug":
        this.validSlug = this.checkName(value);
        this.validWarnSlug = this.validSlug ? true : false;
        break;
      case "name":
        this.validName = this.checkName(value);
        this.validWarnName = this.validName ? true : false;
        break;
      case "price":
        this.validPrice = this.checkPrice(Number(value));
        this.validWarnPrice = this.validPrice ? true : false;
      break;
      case "desc":
        this.validDesc = this.checkDesc(value);
        this.validWarnDesc = this.validDesc ? true : false;
      break;
      case "img":
        this.validImg = await this.checkImg(value);
        this.validWarnImg = this.validImg ? true : false;
      break;
    }
    this.hideBtn = this.validSlug && this.validName && this.validPrice && this.validDesc && this.validImg;
  }

  checkName(value: string): boolean{
    if (!value) {
      return false;
    };
    const strRegExp: string = `[\\p{L}\\s\`]{${value.length}}`;
    const regexp = new RegExp(strRegExp,"u");
    if (regexp.test(value)) {
      return true;
    }
    else {
      return false;
    };
  }

  checkPrice(value: number): boolean{
    if (!value || value < 0) {
      return false;
    };
    return true;
  }

  checkDesc(value: string): boolean{
    if (!value) {
      return false;
    };
    const strRegExp: string = `[\\p{L}\\s\\d]{${value.length}}`;
    const regexp = new RegExp(strRegExp,"u");
    if (regexp.test(value)) {
      return true;
    }
    else {
      return false;
    };
  }

  async checkImg(value: string): Promise<boolean> {
    if (!value) {
      return false;
    }
  
    let isImageLoaded = false;

    await this.http.get(value, { responseType: 'blob' }).toPromise().then(() => {
      isImageLoaded = true;
    }).catch(() => {
      isImageLoaded = false;
    });

    if(isImageLoaded){
      return true;
    } else{
      return false;
    }
  }

  addLot(){
      this.lotService.addLots(this.product);
      this.product = new Lot();
      // shitty код треба придумати щось круче
      this.validSlug = false;
      this.validName = false;
      this.validPrice = false;
      this.validDesc = false;
      this.validImg = false;
      this.hideBtn = false;

      this.validWarnSlug = true;
      this.validWarnName = true;
      this.validWarnPrice = true;
      this.validWarnDesc = true;
      this.validWarnImg = true;
  }

  removeLot(index: number){
    this.lotService.removeLot(index)
  }

  
}
