import { Component } from '@angular/core';
import { loadWeather } from './state/weather.actions';
import { Store } from '@ngrx/store';
import { selectWeather, selectWeatherError } from './state/weather.selectors';
import { CurrentWeatherComponent } from "./components/current-weather/current-weather.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { ForecastViewComponent } from "./components/forecast-view/forecast-view.component";
import { AsyncPipe } from '@angular/common';
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
  constructor(private store: Store) {}

  ngOnInit() {
    // this.store.dispatch(loadWeather({ location: '28227'}));
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorite');
    if (savedFavorites) {
      this.favorite = JSON.parse(savedFavorites);
    }
  }

  onSearch(location: string) {
    this.store.dispatch(loadWeather({ location }));
  }

  onFavorite(location: string) {
    console.log('location:', location);
    
    if (!location || location.trim() === '') {
      alert('Cannot add empty location to favorites');
      return;
    }
    
    if (!this.favorite.includes(location)) {
      this.favorite = [...this.favorite, location];
      localStorage.setItem('favorite', JSON.stringify(this.favorite));
      alert('Favorite added');
    } else {
      alert('Location already in favorites');
    }
  }

  onLoadFav(){
    this.showFavorites = true;
  }


  //cookies less storage than local and session storage and could be used in older browsers 4kb
  //cookies expiration is set manually
  //local storage can hold 10 mb and session can hold 5 mb
  //local storage never expires until user deletes it or the code is deleted
  //session storage can only be used in the same tab not across multiple windows 
  //session storage expires when the tab is closed
}
