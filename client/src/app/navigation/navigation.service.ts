import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private navigationSubject = new Subject<void>();

  navigation$ = this.navigationSubject.asObservable();

  open(): void {
    this.navigationSubject.next();
  }
}
