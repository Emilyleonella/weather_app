import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LocationSuggestion {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'http://localhost:3000/weather';

  constructor(private http: HttpClient) {}

  getWeather(q: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/forecast?q=${q}&days=3`);
  }

  getLocationSuggestions(query: string): Observable<LocationSuggestion[]> {
    return this.http.get<LocationSuggestion[]>(`${this.apiUrl}/search?q=${query}`);
  }

}
