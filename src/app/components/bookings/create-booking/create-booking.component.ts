import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightsService } from '../../../services/flights.service';
import { BookingsService } from '../../../services/bookings.service';
import { Flight } from '../../../models';

@Component({
  selector: 'app-create-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {
  flight: Flight | null = null;
  passengers = 1;
  loading = true;
  submitting = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightsService: FlightsService,
    private bookingsService: BookingsService
  ) {}

  ngOnInit(): void {
    const flightId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadFlight(flightId);
  }

  loadFlight(id: number): void {
    this.flightsService.getFlight(id).subscribe({
      next: (data) => { this.flight = data; this.loading = false; },
      error: (err) => { this.error = err.message; this.loading = false; }
    });
  }

  get totalPrice(): number { return this.flight ? this.flight.price * this.passengers : 0; }

  onSubmit(): void {
    if (!this.flight) return;

    this.submitting = true;
    this.error = null;

    this.bookingsService.createBooking({ flightId: this.flight.id, passengers: this.passengers })
      .subscribe({
        next: (response) => {
          this.success = response.message;
          setTimeout(() => { this.router.navigate(['/bookings']); }, 2000);
        },
        error: (err) => { this.error = err.message; this.submitting = false; }
      });
  }
}
