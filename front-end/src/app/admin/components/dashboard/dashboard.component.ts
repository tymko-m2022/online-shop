import { Component } from '@angular/core';
import { LotService } from 'src/app/services/lot.service';
import { HttpClient } from '@angular/common/http';
import { DEFAULT_LOT, Lot } from 'src/app/models/lot.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  products: Lot[];

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

  constructor(private lotService: LotService, private http: HttpClient) {
    this.product = new DEFAULT_LOT();
    this.products = this.lotService.products ? this.lotService.returnLots() : [];
  }

  async changeField(event: Event) {
    const target = event.target as HTMLInputElement;
    let value = target.value;
    const name = target.name;
    if (name === "price" && value[0] === "0") {
      target.value = value.slice(1);
      value = target.value;
    }
    switch (name) {
      case "slug":
        this.validSlug = this.checkSlug(value);
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
        this.checkImg(value);
        return
    }
    this.hideButton();
  }

  hideButton() {
    this.hideBtn = this.validSlug && this.validName && this.validPrice && this.validDesc && this.validImg;
  }

  checkSlug(value: string): boolean {
    if (!value) {
      return false;
    }

    const existingProduct = this.products.find(product => product.slug === value);
    if (!existingProduct) {
      const strRegExp: string = `[\\(a-zA-Z){L}\\d\\-]{${value.length}}`;
      const regexp = new RegExp(strRegExp, "u");
      if (regexp.test(value)) {
        return true;
      }
    }

    return false;
  }

  checkName(value: string): boolean {
    if (!value) {
      return false;
    }
    const strRegExp: string = `[\\p{L}\\s\`]{${value.length}}`;
    const regexp = new RegExp(strRegExp, "u");
    if (regexp.test(value)) {
      return true;
    }
    else {
      return false;
    };
  }

  checkPrice(value: number): boolean {
    if (!value || value < 0) {
      return false;
    }
    const numRegExp: string = `[\\d]{${value.toString().length}}`;
    const regexp = new RegExp(numRegExp, "u");
    if (regexp.test(value.toString())) {
      return true;
    }
    else {
      return false;
    };
  }

  checkDesc(value: string): boolean {
    if (!value) {
      return false;
    }
    const strRegExp: string = `[\\p{L}\\s\\d]{${value.length}}`;
    const regexp = new RegExp(strRegExp, "u");
    if (regexp.test(value)) {
      return true;
    }
    else {
      return false;
    };
  };

  checkImg(value: string) {
    const img = new Image();
    img.src = value;
    img.onload = () => { this.validImg = true; this.validWarnImg = true; this.hideButton() };
    img.onerror = () => { this.validImg = false; this.validWarnImg = false; this.hideButton() };
  };

  addLot() {
    this.lotService.addLots(this.product);
    this.product = new DEFAULT_LOT();
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

  removeLot(index: number) {
    this.lotService.removeLot(index)
  }


}
