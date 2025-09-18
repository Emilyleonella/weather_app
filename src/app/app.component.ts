import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { loadWeather } from './state/weather.actions';
import { Store } from '@ngrx/store';
import { selectWeather, selectWeatherError } from './state/weather.selectors';
import { CurrentWeatherComponent } from "./components/current-weather/current-weather.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { ForecastViewComponent } from "./components/forecast-view/forecast-view.component";
import { AsyncPipe, isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    CurrentWeatherComponent, 
    SearchBarComponent, 
    ForecastViewComponent,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { 
  title = 'weatherApp';
  weather$ = this.store.select(selectWeather);
  error$ = this.store.select(selectWeatherError);
  favorite: any[] = [];
  load = true;
  showFavorites = false;
  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // this.store.dispatch(loadWeather({ location: '28227'}));
    
    // Loads favorites from localStorage (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      const savedFavorites = localStorage.getItem('favorite');
      if (savedFavorites) {
        this.favorite = JSON.parse(savedFavorites);
      }
    }
  }
  
  onSearch(location: string) {
    this.store.dispatch(loadWeather({ location }));
  }
  
  onFavorite(location: string) {
    
    //this is to prevent adding empty locations to favorites
    // checks if the location is empty, null, undefined, or just whitespace
    if (!location || location.trim() === '') {
      alert('Cannot add empty location to favorites');
      return;
    }
    //if the location is not in the favorites array, add it to the favorites array
    // also prevents adding the same location to favorites multiple times
    if (!this.favorite.includes(location)) {
      //this spreads the current favorites and adds the new location to the end of the array
      // the square brackets are used to create a new array
      this.favorite = [...this.favorite, location];
      //here we are saving the new favorites array to the localStorage (only in browser)
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('favorite', JSON.stringify(this.favorite));
      }
      alert('Favorite added');
    } else {
      alert('Location already in favorites');
    }
  }

  onLoadFav(){
    this.showFavorites = true;
  }

//TODOS:
// find how to set limit for favorites
// how to remove favorites
// geolocation api Search/Autocomplete API  *****
// recently viewed locations
// current session or across sessions
// spinner or skeleton loader
// location icon
// @if instead of ngif  







  //cookies less storage than local and session storage and could be used in older browsers 4kb
  //cookies expiration is set manually
  //local storage can hold 10 mb and session can hold 5 mb
  //local storage never expires until user deletes it or the code is deleted
  //session storage can only be used in the same tab not across multiple windows 
  //session storage expires when the tab is closed
}
