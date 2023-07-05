import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ExchangeRateService } from 'src/app/services/currency.service';
import { RobotService } from 'src/app/services/robot.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cartCount: number = 0;
  counterThemeClicks: number = 0;
  resetCount: any;
  selectedCurrency: string = "";

  constructor(private robotService: RobotService, private cartService: CartService, private themeService: ThemeService, private exchangeRateService: ExchangeRateService) { }

  ngOnInit(): void {
    this.selectedCurrency = this.exchangeRateService.currency;
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }

  changeTheme() {
    this.themeService.changeAndUpdateTheme();
    this.counterThemeClicks += 1;
    if (this.counterThemeClicks === 1) {
      this.resetCount = setTimeout(() => {this.counterThemeClicks = 0},10000)
    };
    if (this.counterThemeClicks === 10) {
      clearTimeout(this.resetCount);
      this.counterThemeClicks = 0;
      this.robotService.verificationParameters();
      this.robotService.robotStateTrue();
    }
  }

  getTheme() {
    const newTheme: boolean = this.themeService.returnTheme();
    return newTheme;
  }

  changeCurrency(currency: string): void {
    this.exchangeRateService.updateCurrency(currency);
    this.selectedCurrency = this.exchangeRateService.currency;
  }

}
