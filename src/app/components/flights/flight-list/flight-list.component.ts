import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightsService } from '../../../services/flights.service';
import { AuthService } from '../../../services/auth.service';
import { Flight } from '../../../models';

@Component({
  selector: 'app-flight-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  flights: Flight[] = [];
  origins: string[] = [];
  destinations: string[] = [];
  selectedOrigin = '';
  selectedDestination = '';
  selectedDate = '';
  loading = true;
  error: string | null = null;

  constructor(
    private flightsService: FlightsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFlights();
    this.loadFilters();
  }

  loadFlights(): void {
    this.loading = true;
    this.error = null;

    const filters: any = {};
    if (this.selectedOrigin) filters.origin = this.selectedOrigin;
    if (this.selectedDestination) filters.destination = this.selectedDestination;
    if (this.selectedDate) filters.date = this.selectedDate;

    this.flightsService.getFlights(filters).subscribe({
      next: (data) => {
        this.flights = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  loadFilters(): void {
    this.flightsService.getOrigins().subscribe({ next: (data) => this.origins = data });
    this.flightsService.getDestinations().subscribe({ next: (data) => this.destinations = data });
  }

  onSearch(): void { this.loadFlights(); }
  clearFilters(): void { this.selectedOrigin = ''; this.selectedDestination = ''; this.selectedDate = ''; this.loadFlights(); }

  bookFlight(flight: Flight): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/book', flight.id]);
  }

  isAuthenticated(): boolean { return this.authService.isAuthenticated(); }
}
