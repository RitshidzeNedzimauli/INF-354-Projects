import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchedService {

  private baseUrl = 'https://localhost:7296/api/watched';

  constructor(private http: HttpClient) {}

  getWatched(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  markAsWatched(movie: any): Observable<any> {
    return this.http.post(this.baseUrl, movie);
  }

  updateWatched(id: number | string, movieData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, movieData);
  }

  removeFromWatched(id: number | string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  resetTimesWatched(id: number | string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset/${id}`, {});
  }

  incrementTimesWatched(id: number | string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, { increment: true });
  }
}