import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherService } from '../weather.service';
import * as WeatherActions from './weather.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class WeatherEffects {
  loadWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.loadWeather),
      mergeMap(action =>
        this.weatherService.getWeather(action.location, action.days).pipe(
          map(weather => WeatherActions.loadWeatherSuccess({ weather })),
          catchError(error => of(WeatherActions.loadWeatherFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    @Inject(WeatherService) private weatherService: WeatherService
  ) {}
}