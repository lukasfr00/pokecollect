import { Component, Input, OnInit } from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { NavigationService } from '../navigation/navigation.service';
import { User } from '../sites/user/user.model';
import { UserService } from '../sites/user/user.service';
import { filter } from 'rxjs/operators';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NavigationComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  user!: any;
  currentTitle: string = '';
  isNavigationOpen: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private navigationService: NavigationService
  ) {
    // Abonniere Router-Ereignisse, um den Titel der aktuellen Seite zu ermitteln
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitle();
      });
  }

  ngOnInit(): void {
    this.loadUser();
    this.updateTitle();
  }

  loadUser(): void {
    this.userService.getUser().subscribe(
      (data: any) => {
        //console.log('data: ', data);
        this.user = data;
      },
      (error) => {
        console.error('Fehler beim Abrufen des Usera:', error);
      }
    );
  }

  updateTitle(): void {
    const currentRoute = this.router.routerState.snapshot.root;
    this.currentTitle = this.getTitle(currentRoute);
  }

  getTitle(route: any): string {
    let title = route.data?.title || '';
    if (route.firstChild) {
      title = this.getTitle(route.firstChild) || title;
    }
    return title;
  }

  openNavigation(): void {
    this.isNavigationOpen = true;
  }

  toggleNavigation(): void {
    this.isNavigationOpen = !this.isNavigationOpen;
  }

  closeNavigation(): void {
    this.isNavigationOpen = false;
  }
}
