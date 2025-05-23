import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { WeatherResponse } from './forecast.interface';
import { Observable } from 'rxjs';

@Controller('weather')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hi')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('forecast')
  getWeatherByLocation(
    @Query('q') q: string, // US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name
    @Query('days') days: string, // Number of days of weather forecast. Value ranges from 1 to 14
  ): Observable<WeatherResponse> {
    return this.appService.getWeatherByLocation(q, days);
  }
}
