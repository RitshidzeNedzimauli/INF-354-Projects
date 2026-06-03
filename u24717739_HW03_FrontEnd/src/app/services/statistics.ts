import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private apiUrl = 'https://localhost:7296/api/statistics';

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}