import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from './weather.reducer';


export const selectWeatherState = createFeatureSelector<WeatherState>('weather');


export const selectWeather = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.weather
);


export const selectWeatherLoading = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.loading
);


export const selectWeatherError = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.error
); 