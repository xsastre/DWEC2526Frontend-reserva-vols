export interface Flight {
  id: number;
  flightNumber: string;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
  airline: string;
}
