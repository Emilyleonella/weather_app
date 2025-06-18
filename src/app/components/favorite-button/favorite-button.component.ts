import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-button.component.html',
  styleUrl: './favorite-button.component.css'
})
export class FavoriteButtonComponent {
  @Input() location: string = '';
  @Input() isFavorite: boolean = false;
  @Output() onFavorite = new EventEmitter<string>();

  toggleFavorite() {
    this.onFavorite.emit(this.location);
  }
}
