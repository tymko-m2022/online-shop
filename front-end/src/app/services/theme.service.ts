import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private colorTheme: boolean;

  constructor() { 
    this.colorTheme = (() => {
      if (localStorage.getItem('theme')) {

        const memoryObject: object = JSON.parse(localStorage.getItem('theme')!);
        if ("color" in memoryObject && typeof memoryObject.color === "boolean") {
  
          return memoryObject.color;
  
        }
  
      };
  
      return false;
    })();
  }

  returnTheme () {
    return this.colorTheme
  }

  changeAndUpdateTheme () {
    this.colorTheme = !this.colorTheme;
    localStorage.removeItem('theme');
    const memoryObject = {
      color: this.returnTheme()
    };
    localStorage.setItem('theme', JSON.stringify(memoryObject));
  }

  

}
