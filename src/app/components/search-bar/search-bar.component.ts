import { Component, output, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService, LocationSuggestion } from '../../weather.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnDestroy {
  searchQuery: string = '';
  load = true;
  $onSearch = output<string>();
  $onFavorite = output<string>();
  $onLoadFavorite = output<void>();
  
  // Autocomplete properties
  suggestions: LocationSuggestion[] = [];
  showSuggestions = false;
  selectedIndex = -1;
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private weatherService: WeatherService) {
    // Set up debounced search for autocomplete
    this.searchSubject.pipe(
      debounceTime(300), // Wait 300ms after user stops typing
      distinctUntilChanged(), // Only search if query changed
      switchMap(query => {
        if (query.length < 2) {
          return of([]); // Don't search for queries less than 2 characters
        }
        return this.weatherService.getLocationSuggestions(query);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (suggestions: LocationSuggestion[]) => {
        this.suggestions = suggestions;
        this.showSuggestions = suggestions.length > 0;
        this.selectedIndex = -1;
      },
      error: () => {
        this.suggestions = [];
        this.showSuggestions = false;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onInputChange() {
    this.searchSubject.next(this.searchQuery);
  }

  onSearch() {
    this.$onSearch.emit(this.searchQuery);
    this.load = false;
    this.hideSuggestions();
  }

  onFavorite() {
    this.$onFavorite.emit(this.searchQuery);
  }

  selectSuggestion(suggestion: LocationSuggestion) {
    this.searchQuery = `${suggestion.name}, ${suggestion.region}, ${suggestion.country}`;
    this.hideSuggestions();
    this.onSearch();
  }

  hideSuggestions() {
    this.showSuggestions = false;
    this.selectedIndex = -1;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (!this.showSuggestions) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.suggestions.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedIndex >= 0) {
          this.selectSuggestion(this.suggestions[this.selectedIndex]);
        } else {
          this.onSearch();
        }
        break;
      case 'Escape':
        this.hideSuggestions();
        break;
    }
  }

  // Handle clicking outside to close suggestions
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const searchContainer = target.closest('.search-container');
    if (!searchContainer) {
      this.hideSuggestions();
    }
  }
}