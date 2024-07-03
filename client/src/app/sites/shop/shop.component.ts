import { Component } from '@angular/core';
import { PackComponent } from './pack/pack.component';
import { Pack } from './shop.module';
import { PackService } from './pack/pack.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  imports: [PackComponent],
})
export class ShopComponent {
  packs: Pack[] = [];

  constructor(private packService: PackService, private router: Router) {}

  ngOnInit(): void {
    this.packService.getPacks().subscribe((data) => {
      this.packs = data;
    });
  }

  viewPack(packId: string): void {
    this.router.navigate(['/pack', packId]);
  }
}
