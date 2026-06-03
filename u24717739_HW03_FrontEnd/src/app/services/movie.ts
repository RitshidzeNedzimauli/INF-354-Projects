import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl = 'https://localhost:7296/api/movies';

  constructor(private http: HttpClient) {}

  searchMovies(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/search`, {
      params: { t: query }
    });
  }

  getMovieById(imdbId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${imdbId}`);
  }
}