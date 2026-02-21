import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsService } from '../../../services/bookings.service';
import { Booking } from '../../../models';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;
  error: string | null = null;

  constructor(private bookingsService: BookingsService) {}

  ngOnInit(): void { this.loadBookings(); }

  loadBookings(): void {
    this.loading = true;
    this.error = null;
    this.bookingsService.getBookings().subscribe({
      next: (data) => { this.bookings = data; this.loading = false; },
      error: (err) => { this.error = err.message; this.loading = false; }
    });
  }

  cancelBooking(id: number): void {
    if (confirm('Estàs segur que vols cancel·lar aquesta reserva?')) {
      this.bookingsService.cancelBooking(id).subscribe({
        next: () => { this.loadBookings(); },
        error: (err) => { alert(err.message); }
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'confirmed': return 'status-confirmed';
      case 'cancelled': return 'status-cancelled';
      case 'pending': return 'status-pending';
      default: return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'cancelled': return 'Cancel·lada';
      case 'pending': return 'Pendent';
      default: return status;
    }
  }
}
