import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Booking, CreateBookingRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private apiUrl = 'http://localhost:3000/api/bookings';

  constructor(private http: HttpClient) { }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createBooking(data: CreateBookingRequest): Observable<{ message: string; booking: Booking }> {
    return this.http.post<{ message: string; booking: Booking }>(this.apiUrl, data)
      .pipe(catchError(this.handleError));
  }

  updateBooking(id: number, passengers: number): Observable<{ message: string; booking: Booking }> {
    return this.http.put<{ message: string; booking: Booking }>(`${this.apiUrl}/${id}`, { passengers })
      .pipe(catchError(this.handleError));
  }

  cancelBooking(id: number): Observable<{ message: string; booking: Booking }> {
    return this.http.delete<{ message: string; booking: Booking }>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error en la operació';
    if (error.error && error.error.error) {
      errorMessage = error.error.error;
    }
    return throwError(() => new Error(errorMessage));
  }
}
