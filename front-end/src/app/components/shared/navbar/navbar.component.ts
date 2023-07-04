import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cartCount: number = 0;

  constructor(private cartService: CartService, private themeService: ThemeService){}

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }

  changeTheme () {
    this.themeService.changeAndUpdateTheme();
  }

  getTheme () {
    const newTheme: boolean = this.themeService.returnTheme();
    return newTheme;
  }

}
