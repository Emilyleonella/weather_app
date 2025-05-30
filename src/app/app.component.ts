import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { loadWeather } from './state/weather.actions';
import { Store } from '@ngrx/store';
import { selectWeather } from './state/weather.selectors';
import { CurrentWeatherComponent } from "./components/current-weather/current-weather.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CurrentWeatherComponent, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { 
  title = 'weatherApp';
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadWeather({ location: '28277', days: '3' }));
    this.store.select(selectWeather).subscribe(console.log);
  }

  //cookies less storage than local and session storage and could be used in older browsers 4kb
  //cookies expiration is set manually
  //local storage can hold 10 mb and session can hold 5 mb
  //local storage never expires until user deletes it or the code is deleted
  //session storage can only be used in the same tab not across multiple windows 
  //session storage expires when the tab is closed
}
