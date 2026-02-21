import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
	{ path: '', redirectTo: '/flights', pathMatch: 'full' },
	{
		path: 'login',
		loadComponent: () => import('./components/auth/login/login.component')
			.then(m => m.LoginComponent)
	},
	{
		path: 'register',
		loadComponent: () => import('./components/auth/register/register.component')
			.then(m => m.RegisterComponent)
	},
	{
		path: 'flights',
		loadComponent: () => import('./components/flights/flight-list/flight-list.component')
			.then(m => m.FlightListComponent)
	},
	{
		path: 'book/:id',
		loadComponent: () => import('./components/bookings/create-booking/create-booking.component')
			.then(m => m.CreateBookingComponent),
		canActivate: [authGuard]
	},
	{
		path: 'bookings',
		loadComponent: () => import('./components/bookings/booking-list/booking-list.component')
			.then(m => m.BookingListComponent),
		canActivate: [authGuard]
	}
];
