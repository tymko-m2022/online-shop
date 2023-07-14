import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Lot } from '../models/lot.model';

@Injectable({
  providedIn: 'root'
})
export class LotService {
  private apiUrl = '/api/lots';
  private lotsSubject: BehaviorSubject<Lot[]> = new BehaviorSubject<Lot[]>([]);
  public lots$: Observable<Lot[]> = this.lotsSubject.asObservable();

  constructor(private http: HttpClient) { }

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

  getCommentsBySlug(slug: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/${slug}/comments`).pipe(
      catchError((error) => {
        console.error('Помилка отримання коментарів за слагом:', error);
        return [];
      })
    );
  }

  addComment(slug: string, comment: string): void {
    this.http.post(`${this.apiUrl}/${slug}/comments`, { comment }).pipe(
      catchError((error) => {
        console.error('Помилка додавання коментаря до лота за слагом:', error);
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