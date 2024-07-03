import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Tokens werden bereits im AuthService gespeichert
        this.router.navigate(['/collection']);
      },
      (error) => {
        console.error('Login fehlgeschlagen:', error);
      }
    );
  }

  register() {
    this.router.navigate(['/register']);
  }
}
