import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private colorTheme: boolean;
  private colorSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  colorTheme$ = this.colorSubject.asObservable();

  constructor() {
    this.colorTheme = this.dataColor;
    this.colorSubject.next(this.colorTheme);
  }

  set dataColor(item: boolean) {
    localStorage.setItem("color", JSON.stringify(item));
    this.colorSubject.next(item);
  }

  get dataColor(): boolean {
    const data = localStorage.getItem("color");
    return data ? JSON.parse(data) : false;
  }

  returnTheme(): boolean {
    return this.colorTheme;
  }

  changeAndUpdateTheme(): void {
    this.colorTheme = !this.colorTheme;
    this.dataColor = this.colorTheme;
    this.colorSubject.next(this.dataColor);
  }
}