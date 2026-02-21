import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Flight } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private apiUrl = 'http://localhost:3000/api/flights';

  constructor(private http: HttpClient) { }

  getFlights(filters?: { origin?: string; destination?: string; date?: string }): Observable<Flight[]> {
    let params = new HttpParams();
    if (filters) {
      if (filters.origin) params = params.set('origin', filters.origin);
      if (filters.destination) params = params.set('destination', filters.destination);
      if (filters.date) params = params.set('date', filters.date);
    }
    return this.http.get<Flight[]>(this.apiUrl, { params })
      .pipe(catchError(this.handleError));
  }

  getFlight(id: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getOrigins(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/search/origins`)
      .pipe(catchError(this.handleError));
  }

  getDestinations(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/search/destinations`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error al carregar els vols';
    if (error.error && error.error.error) {
      errorMessage = error.error.error;
    }
    return throwError(() => new Error(errorMessage));
  }
}
