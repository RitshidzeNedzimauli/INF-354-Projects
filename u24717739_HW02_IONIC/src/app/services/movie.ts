import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MovieService {

  baseUrl = 'https://imdb.iamidiotareyoutoo.com/search?q=';

  constructor(private http: HttpClient) {}

  searchMovies(query: string) {
    return this.http.get(this.baseUrl + query);
  }
}