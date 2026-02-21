import { Flight } from './flight.model';

export interface Booking {
  id: number;
  userId: number;
  flightId: number;
  flight?: Flight;
  passengers: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled' | 'pending';
  createdAt: string;
}

export interface CreateBookingRequest {
  flightId: number;
  passengers: number;
}
