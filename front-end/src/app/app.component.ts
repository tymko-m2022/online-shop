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
}
