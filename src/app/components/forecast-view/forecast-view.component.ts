import { Component, input, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Forecast, IWeather } from '../../interfaces/weather';

@Component({
  selector: 'app-forecast-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast-view.component.html',
  styleUrls: ['./forecast-view.component.css']
})
export class ForecastViewComponent  {
  $forecast = input<IWeather>();
  


} 