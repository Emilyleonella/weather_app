import { AppService } from './app.service';
import { WeatherResponse } from './forecast.interface';
import { Observable } from 'rxjs';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getWeatherByLocation(q: string, days: string): Observable<WeatherResponse>;
}
