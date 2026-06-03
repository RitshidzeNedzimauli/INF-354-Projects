import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  private baseUrl = 'https://localhost:7296/api/watchlist';

  constructor(private http: HttpClient) {}

  getWatchlist(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addToWatchlist(movie: any): Observable<any> {
    return this.http.post(this.baseUrl, movie);
  }

  removeFromWatchlist(imdbId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${imdbId}`);
  }

  isInWatchlist(imdbId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/exists/${imdbId}`);
  }
}