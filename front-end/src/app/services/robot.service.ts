import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  private robotState: boolean;

  constructor() { 
    this.robotState = (() => {
      if (localStorage.getItem('robot')) {

        const memoryObject: object = JSON.parse(localStorage.getItem('robot')!);
        if ("data" in memoryObject && typeof memoryObject.data === "boolean") {
  
          return memoryObject.data;
  
        }
  
      };
  
      return false;
    })();
  }

  returnRobotState () {
    return this.robotState
  }

  updateLocalStorage () {
    localStorage.removeItem('robot');
    const memoryObject = {
      data: this.returnRobotState()
    };
    localStorage.setItem('robot', JSON.stringify(memoryObject));
  }

  robotStateTrue () {
    this.robotState = true;
    this.updateLocalStorage();
  }

  robotStateFalse () {
    this.robotState = false;
    this.updateLocalStorage();
  }

}
