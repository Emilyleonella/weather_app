import { createAction, props } from '@ngrx/store';

export const loadWeather = createAction(
  '[Weather] Load Weather',
  props<{ location: string, days: string }>()
);

export const loadWeatherSuccess = createAction(
  '[Weather] Load Weather Success',
  props<{ weather: any }>() // Replace 'any' with your model
);

export const loadWeatherFailure = createAction(
  '[Weather] Load Weather Failure',
  props<{ error: string }>()
);