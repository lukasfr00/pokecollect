import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  firstname: string = '';
  lastname: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService
      .register(
        this.username,
        this.email,
        this.password,
        this.firstname,
        this.lastname
      )
      .subscribe(
        (response) => {
          // Tokens werden bereits im AuthService gespeichert
          this.router.navigate(['/collection']);
        },
        (error) => {
          console.error('Registrierung fehlgeschlagen:', error);
        }
      );
  }

  login() {
    this.router.navigate(['/login']);
  }
}
