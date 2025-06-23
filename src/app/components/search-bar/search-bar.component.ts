import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, FavoriteButtonComponent],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchQuery: string = '';
  load = true;
  $onSearch = output<string>();
  $onFavorite = output<string>();
  $onLoadFavorite = output<void>();


  onSearch() {
    this.$onSearch.emit(this.searchQuery);
    this.load = false;
  }

  onFavorite() {
    this.$onFavorite.emit(this.searchQuery);
  } 

}