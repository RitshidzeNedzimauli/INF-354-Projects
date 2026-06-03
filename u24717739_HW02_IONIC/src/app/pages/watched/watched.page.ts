import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watched',
  templateUrl: './watched.page.html',
  standalone: false
})
export class WatchedPage {

  movies: any[] = [];

  constructor(private storage: StorageService, private router: Router) {}

  ionViewWillEnter() {
    this.loadMovies();
  }

  async loadMovies() {
    this.movies = await this.storage.get('watched') || [];
  }

  openDetails(movie: any) {
    this.router.navigate(['/movie-details'], { state: { movie } });
  }

  async reset(movie: any) {

    let watched = await this.storage.get('watched') || [];
    watched = watched.filter((m: any) => m['#IMDB_ID'] !== movie['#IMDB_ID']);

    delete movie.timesWatched;

    let watchlist = await this.storage.get('watchlist') || [];

    const exists = watchlist.some((m: any) => m['#IMDB_ID'] === movie['#IMDB_ID']);

    if (!exists) {
      watchlist.push(movie);
    }

    await this.storage.set('watched', watched);
    await this.storage.set('watchlist', watchlist);

    this.loadMovies();
  }
}