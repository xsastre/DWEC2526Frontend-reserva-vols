import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error: string | null = null;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.name || !this.email || !this.password) {
      this.error = 'Tots els camps són obligatoris';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error = 'Les contrasenyes no coincideixen';
      return;
    }

    if (this.password.length < 6) {
      this.error = 'La contrasenya ha de tenir mínim 6 caràcters';
      return;
    }

    this.loading = true;
    this.error = null;

    this.authService.register({ 
      name: this.name, 
      email: this.email, 
      password: this.password 
    }).subscribe({
      next: () => {
        this.router.navigate(['/flights']);
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }
}
