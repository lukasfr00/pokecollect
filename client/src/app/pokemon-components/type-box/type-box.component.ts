import { Component, HostBinding, Input } from '@angular/core';
import { Type } from '../../pokemon-struct/types';

@Component({
  selector: 'app-type-box',
  standalone: true,
  imports: [],
  templateUrl: './type-box.component.html',
  styleUrl: './type-box.component.scss',
})
export class TypeBoxComponent {
  @Input({ required: true }) type!: any;
  @Input() border!: boolean;

  getDecodedImage(uri: string): string {
    return decodeURI(uri);
  }
}
