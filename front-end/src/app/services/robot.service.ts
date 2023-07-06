import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RobotService {
  private robotState: boolean;
  private blockingState: boolean;
  private stopBlocking: number;
  private firstTerm: number = 1;
  private secondTerm: number = 1;

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
    this.blockingState = (() => {
      if (localStorage.getItem('robot')) {

        const memoryObject: object = JSON.parse(localStorage.getItem('robot')!);
        if ("dataBlock" in memoryObject && typeof memoryObject.dataBlock === "boolean") {
  
          return memoryObject.dataBlock;
  
        }
  
      };
  
      return false;
    })();
    this.stopBlocking = (() => {
      if (localStorage.getItem('robot')) {

        const memoryObject: object = JSON.parse(localStorage.getItem('robot')!);
        if ("countdown" in memoryObject && typeof memoryObject.countdown === "number") {
  
          return memoryObject.countdown;
  
        }
  
      };
  
      return 0;
    })();
  }

  returnRobotState () {
    return this.robotState
  }

  returnBlockingState () {
    return this.blockingState
  }

  returnStopBlocking () {
    return this.stopBlocking
  }

  updateLocalStorage () {
    localStorage.removeItem('robot');
    const memoryObject = {
      data: this.returnRobotState(),
      dataBlock: this.returnBlockingState(),
      countdown: this.returnStopBlocking()
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

  blockingStateTrue () {
    this.blockingState = true;
    this.updateLocalStorage();
  }

  blockingStateFalse () {
    this.blockingState = false;
    this.updateLocalStorage();
  }

  verificationParameters () {
    this.firstTerm= Math.floor(Math.random()*100+1);
    this.secondTerm= Math.floor(Math.random()*100+1);
  }

  returnFirstTerm () {
    return this.firstTerm
  }

  returnSecondTerm () {
    return this.secondTerm
  }

  startCountdown () {
    this.stopBlocking = 60
  }

  countdownMinus () {
    this.stopBlocking -= 1
  }

}
