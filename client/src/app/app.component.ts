import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ShopComponent } from './sites/shop/shop.component';
import { HeaderComponent } from './header/header.component';
import { routes } from './app.routes';
import { AuthService } from './sites/auth/auth.service';
import { NavigationComponent } from './navigation/navigation.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, ShopComponent, HeaderComponent, NavigationComponent],
})
export class AppComponent {
  showHeaderAndBackground: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showHeaderAndBackground =
          !event.urlAfterRedirects.startsWith('/pokemon/') &&
          !event.urlAfterRedirects.startsWith('/pack/');
      });
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
