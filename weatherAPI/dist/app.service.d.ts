import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { WeatherResponse } from './interface/forecast.interface';
import { Observable } from 'rxjs';
import { LocationResponse } from './interface';
export declare class AppService {
    private readonly httpService;
    private readonly configService;
    private readonly apiKey;
    private readonly baseUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    getWeatherByLocation(q: string, days: string): Observable<WeatherResponse>;
    getLocation(q: string): Observable<LocationResponse>;
}
