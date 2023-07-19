import { Component, OnInit } from '@angular/core';
import { RobotService } from './services/robot.service';
import { ThemeService } from './services/theme.service';
import { CartService } from './services/cart.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  body = document.querySelector("body");
  darkTheme: boolean = false;
  title = 'front-end';
  stopIntervalCountdown: any;
  constructor(private robotService: RobotService, private themeService: ThemeService) {
  }

  ngOnInit(): void {
    this.darkTheme = this.themeService.returnTheme();
    this.changeColorSite(this.darkTheme);
    this.themeService.colorTheme$.subscribe((color) => {
      this.darkTheme = color;
      this.changeColorSite(this.darkTheme);
    })
  }

  changeColorSite(color: boolean) {
    if (color && this.body) {
      this.body.classList.remove("whiteTheme");
      this.body.classList.add("darkTheme");
    } else {
      if (this.body) {
        this.body.classList.remove("darkTheme");
        this.body.classList.add("whiteTheme");
      }

    }
  }

  realRobotState() {
    return this.robotService.returnRobotState();
  }

  realBlockingState() {
    return this.robotService.returnBlockingState();
  }

  returnTerm1() {
    return this.robotService.returnFirstTerm();
  }

  returnTerm2() {
    return this.robotService.returnSecondTerm();
  }

  verificationEnd(inputElement: HTMLInputElement) {
    const term1: number = this.robotService.returnFirstTerm();
    const term2: number = this.robotService.returnSecondTerm();
    const sum: number = term1 + term2;
    const result: number = Number(inputElement.value);
    if (sum !== result) {
      this.robotService.blockingStateTrue();
      this.countdown();
    };
    this.robotService.robotStateFalse();
    inputElement.value = '';
  }

  countdown() {
    this.robotService.startCountdown();
    this.stopIntervalCountdown = setInterval(() => {
      this.robotService.countdownMinus();
      if (this.robotService.returnStopBlocking() === 0) {
        clearInterval(this.stopIntervalCountdown);
        this.robotService.blockingStateFalse();
      };
      this.robotService.newStartNotch();
      this.robotService.updateLocalStorage();
    }, 1000)
  }

  returnCountdownState() {
    return this.robotService.returnStopBlocking()
  }
}
