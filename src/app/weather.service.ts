import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = `http://localhost:3000/weather/forecast?q=28277&days=days`;

  constructor(private http: HttpClient) {}

  getWeather(q: string, days: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${q}&days=${days}`);
  }
}
