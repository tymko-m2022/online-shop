import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { LotService } from 'src/app/services/lot.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(private lotService: LotService, private cartService: CartService) { }

  ngOnInit(): void {
    this.lotService.fetchLots();
    setTimeout(() => {
      this.lotService.lots$.subscribe((lots) => {
        this.cartService.updateCartItemsWithLotsData(lots);
      });
    }, 500)
  }
}