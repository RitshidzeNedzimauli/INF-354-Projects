import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  standalone: false
})
export class WatchlistPage {

  movies: any[] = [];

  constructor(private storage: StorageService, private router: Router) {}

  ionViewWillEnter() {
    this.loadMovies();
  }

  async loadMovies() {
    this.movies = await this.storage.get('watchlist') || [];
  }

  async remove(movie: any) {
    this.movies = this.movies.filter(m => m['#IMDB_ID'] !== movie['#IMDB_ID']);
    await this.storage.set('watchlist', this.movies);
  }

  openDetails(movie: any) {
    this.router.navigate(['/movie-details'], { state: { movie } });
  }

  async markAsWatched(movie: any) {

    let watchlist = await this.storage.get('watchlist') || [];
    watchlist = watchlist.filter((m: any) => m['#IMDB_ID'] !== movie['#IMDB_ID']);

    let watched = await this.storage.get('watched') || [];

    const existing = watched.find((m: any) => m['#IMDB_ID'] === movie['#IMDB_ID']);

    if (existing) {
      existing.timesWatched++;
    } else {
      movie.timesWatched = 1;
      watched.push(movie);
    }

    await this.storage.set('watchlist', watchlist);
    await this.storage.set('watched', watched);

    this.loadMovies();
  }
}
