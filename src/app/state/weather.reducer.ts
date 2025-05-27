import { createReducer, on } from '@ngrx/store';

import * as WeatherActions from './weather.actions';

export interface WeatherState {
    weather: any; // Replace 'any' with your weather model/interface
    loading: boolean;
    error: string | null;
  }
  
  export const initialWeatherState: WeatherState = {
    weather: null,
    loading: false,
    error: null
  };
export const weatherReducer = createReducer( 
  initialWeatherState,
  on(WeatherActions.loadWeather, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(WeatherActions.loadWeatherSuccess, (state, { weather }) => ({
    ...state,
    weather,
    loading: false
  })),
  on(WeatherActions.loadWeatherFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);