import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = signal<string | null>(null);
  loading = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.error.set('Tots els camps són obligatoris');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: () => {
          this.router.navigate(['/flights']);
        },
        error: (err) => {
          this.error.set(err.message);
          this.loading.set(false);
        }
      });
  }
}
