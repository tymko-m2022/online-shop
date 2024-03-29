import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Lot } from '../models/lot.model';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class LotService {
  private apiUrl = '/api/lots';
  private lotsSubject = new BehaviorSubject<Lot[]>([]);
  lots$ = this.lotsSubject.asObservable();

  constructor(private http: HttpClient, private cartService: CartService) {
    this.fetchLots();
  }

  fetchLots(): void {
    this.http.get<Lot[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Помилка отримання лотів:', error);
        return [];
      })
    ).subscribe((lots) => {
      this.lotsSubject.next(lots);
    });
  }

  addLot(lot: Lot): void {
    this.http.post<Lot>(this.apiUrl, lot).pipe(
      catchError((error) => {
        console.error('Помилка додавання лота:', error);
        return [];
      })
    ).subscribe((newLot) => {
      const currentLots = this.lotsSubject.getValue();
      this.lotsSubject.next([...currentLots, newLot]);
    });
  }

  returnLots(): Lot[] {
    this.fetchLots();
    console.log(this.lotsSubject.getValue());
    return this.lotsSubject.getValue();
  }

  deleteLot(slug: string): void {
    this.http.delete(`${this.apiUrl}/${slug}`).pipe(
      catchError((error) => {
        console.error('Помилка видалення лота:', error);
        return [];
      })
    ).subscribe(() => {
      const currentLots = this.lotsSubject.getValue();
      const updatedLots = currentLots.filter((lot) => lot.slug !== slug);
      this.lotsSubject.next(updatedLots);
    });
  }

  updateLot(updatedLot: Lot): void {
    this.http.put(`${this.apiUrl}/${updatedLot.slug}`, updatedLot).subscribe(() => {
      const updatedLots = this.lotsSubject.getValue().map((lot) => {
        return lot.slug === updatedLot.slug ? updatedLot : lot;
      });
      this.lotsSubject.next(updatedLots);
    });
  }

  getCommentsBySlug(slug: string): Observable<{ name: string, text: string }[]> {
    return this.http.get<{ name: string, text: string }[]>(`${this.apiUrl}/${slug}/comments`).pipe(
      catchError((error) => {
        console.error('Помилка отримання коментарів за слагом:', error);
        return [];
      })
    );
  }

  addComment(slug: string, comment: { name: string, text: string }): void {
    this.http.post(`${this.apiUrl}/${slug}/comments`, { comment }).pipe(
      catchError((error) => {
        console.error(`Помилка додавання коментаря до лота за слагом: ${slug}`, error);
        return [];
      })
    ).subscribe(() => {
      // Оновлення коментарів після додавання
      this.getCommentsBySlug(slug).subscribe((comments) => {
        const currentLots = this.lotsSubject.getValue();
        const updatedLots = currentLots.map((lot) => {
          if (lot.slug === slug) {
            return { ...lot, comments };
          }
          return lot;
        });
        this.lotsSubject.next(updatedLots);
      });
    });
  }
}