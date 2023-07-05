import { Component } from '@angular/core';
import { RobotService } from './services/robot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end';
  constructor (private robotService: RobotService) {

  }

  realRobotState () {
    return this.robotService.returnRobotState();
  }

  returnTerm1 () {
    return this.robotService.returnFirstTerm();
  }

  returnTerm2 () {
    return this.robotService.returnSecondTerm();
  }

  verificationEnd (inputElement: HTMLInputElement) {
    const term1: number = this.robotService.returnFirstTerm();
    const term2: number = this.robotService.returnSecondTerm();
    const sum: number = term1 + term2;
    const result: number = Number(inputElement.value);
    if (sum === result) {
      this.robotService.robotStateFalse();
      inputElement.value='';
    }
  }

}
