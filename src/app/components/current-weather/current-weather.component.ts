import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { IWeather } from '../../interfaces/weather';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent {
  $weather = input<IWeather>();
  $error = input<string | null>();
} 