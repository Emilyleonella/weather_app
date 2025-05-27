import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { WeatherResponse } from './forecast.interface';
import { catchError, map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AppService {
  private readonly apiKey: string;
  private readonly baseUrl: string = ' http://api.weatherapi.com/v1';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey =
      this.configService.get<string>('WEATHER_API_KEY') ??
      (() => {
        throw new Error('WEATHER_API_KEY is not set');
      })();
  }

  getWeatherByLocation(q: string, days: string): Observable<WeatherResponse> {
    return this.httpService
      .get(`${this.baseUrl}/forecast.json`, {
        params: {
          key: this.apiKey,
          q,
          days,
        },
      })
      .pipe(
        map((response: AxiosResponse<WeatherResponse>) => response.data),
        catchError(() => {
          throw new Error('Failed to fetch weather data');
        }),
      );
  }
}

//mapping to macth the interface ?

// storing & retriving
// mongodb?
// local storage?
// cookies
// browser storage

// ui feel & function
