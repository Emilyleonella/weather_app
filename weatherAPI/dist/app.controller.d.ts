import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { LocationResponse, WeatherResponse } from './interface';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getWeatherByLocation(q: string, days: string): Observable<WeatherResponse>;
    getAutoComplete(q: string): Observable<LocationResponse>;
}
