import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { loadWeather } from './state/weather.actions';
import { Store } from '@ngrx/store';
import { selectWeather } from './state/weather.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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
}
