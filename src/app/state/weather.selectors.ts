import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from './weather.reducer';

// 1. Feature selector for the weather state slice
export const selectWeatherState = createFeatureSelector<WeatherState>('weather');

// 2. Selector for the weather data
export const selectWeather = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.weather
);

// 3. Selector for loading
export const selectWeatherLoading = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.loading
);

// 4. Selector for error
export const selectWeatherError = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.error
); 