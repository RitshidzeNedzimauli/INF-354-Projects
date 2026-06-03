import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  standalone: false
})
export class MovieDetailsPage {

  movie: any = null;
  isInWatchlist = false;
  isWatched = false;

  constructor(
    private storage: StorageService, 
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.loadMovie();
  }

  async loadMovie() {
    // Get movie from router navigation state
    const navState = this.router.getCurrentNavigation()?.extras?.state;
    
    if (navState && 'movie' in navState) {
      this.movie = navState['movie'];
    } 
    else {
      // Fallback for history.state (when navigating directly or refreshing)
      this.movie = history.state?.movie;
    }

    if (!this.movie) {
      console.error('No movie data found in navigation state');
      this.router.navigate(['/tabs/search']);   
      return;
    }

    await this.checkStatus();
  }

  async checkStatus() {
    if (!this.movie?.['#IMDB_ID']) return;

    const watchlist = await this.storage.get('watchlist') || [];
    const watched = await this.storage.get('watched') || [];

    this.isInWatchlist = watchlist.some((m: any) => m['#IMDB_ID'] === this.movie['#IMDB_ID']);
    this.isWatched = watched.some((m: any) => m['#IMDB_ID'] === this.movie['#IMDB_ID']);
  }

  async addToWatchlist() {
    if (!this.movie) return;

    let watchlist = await this.storage.get('watchlist') || [];

    const exists = watchlist.some((m: any) => m['#IMDB_ID'] === this.movie['#IMDB_ID']);

    if (!exists) {
      watchlist.push({ ...this.movie });
      await this.storage.set('watchlist', watchlist);
      alert(' Movie added to Watchlist!');
    } else {
      alert('This movie is already in your Watchlist.');
    }

    await this.checkStatus();
  }

  async markAsWatched() {
    if (!this.movie) return;

    let watchlist = await this.storage.get('watchlist') || [];
    let watched = await this.storage.get('watched') || [];

    // Remove from watchlist if present
    watchlist = watchlist.filter((m: any) => m['#IMDB_ID'] !== this.movie['#IMDB_ID']);

    const existing = watched.find((m: any) => m['#IMDB_ID'] === this.movie['#IMDB_ID']);

    if (existing) {
      existing.timesWatched = (existing.timesWatched || 0) + 1;
    } else {
      const movieCopy = { ...this.movie };
      movieCopy.timesWatched = 1;
      watched.push(movieCopy);
    }

    await this.storage.set('watchlist', watchlist);
    await this.storage.set('watched', watched);

    alert(' Movie marked as Watched!');
    await this.checkStatus();
  }

  goBack() {
    this.router.navigate(['/tabs/search']);
  }
}