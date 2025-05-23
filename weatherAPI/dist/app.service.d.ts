import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { WeatherResponse } from './forecast.interface';
import { Observable } from 'rxjs';
export declare class AppService {
    private readonly httpService;
    private readonly configService;
    private readonly apiKey;
    private readonly baseUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    getHello(): string;
    getWeatherByLocation(q: string, days: string): Observable<WeatherResponse>;
}
