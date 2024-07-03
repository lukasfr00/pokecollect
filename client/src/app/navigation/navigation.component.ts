import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  @Output() closeNavigation = new EventEmitter<void>();

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.close();
  }

  close(): void {
    this.closeNavigation.emit();
  }
}
