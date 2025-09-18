import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { LocationResponse, WeatherResponse } from './interface';

@Controller('weather')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('forecast')
  getWeatherByLocation(
    @Query('q') q: string, // US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name
    @Query('days') days: string, // Number of days of weather forecast. Value ranges from 1 to 3
  ): Observable<WeatherResponse> {
    return this.appService.getWeatherByLocation(q, days);
  }

  @Get('search')
  getAutoComplete(@Query('q') q: string): Observable<LocationResponse> {
    return this.appService.getLocation(q);
  }
}
