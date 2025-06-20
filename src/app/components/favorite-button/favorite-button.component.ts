import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { output } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-button.component.html',
  styleUrl: './favorite-button.component.css'
})
export class FavoriteButtonComponent {
  $favoriteClick = output<void>();

  onClick() {
    this.$favoriteClick.emit();
  }
}
