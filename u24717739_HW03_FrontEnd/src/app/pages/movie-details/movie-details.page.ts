import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { WatchlistService } from '../../services/watchlist';
import { WatchedService } from '../../services/watched';
import { MovieService } from '../../services/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class MovieDetailsPage implements OnInit {

  movie: any = null;
  isLoading = true;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private watchlistService: WatchlistService,
    private watchedService: WatchedService,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.loadMovie();
  }

  loadMovie() {

    const state = this.router.getCurrentNavigation()?.extras?.state
               ?? history.state;

    if (state?.movie) {

      const imdbId = state.movie.imdbId || state.movie.imdbID;

      this.movieService.getMovieById(imdbId).subscribe({

        next: (movie) => {
          this.movie = movie;
          this.isLoading = false;
        },

        error: (err) => {
          console.error('Failed to load movie details', err);
          this.isLoading = false;
        }

      });

    } else {
      this.isLoading = false;
    }
  }

  addToWatchlist() {

    if (!this.movie) return;

    const movieDto = {
      imdbId: this.movie.imdbId || this.movie.imdbID,
      title: this.movie.title || this.movie.Title,
      year: this.movie.year || this.movie.Year,
      poster: this.movie.poster || this.movie.Poster,
      actors: this.movie.actors || this.movie.Actors,
      genre: this.movie.genre || this.movie.Genre
    };

    this.watchlistService.addToWatchlist(movieDto).subscribe({

      next: async () => {
        await this.showToast('Added to Watchlist!', 'success');
      },

      error: async (err) => {
        console.error(err);
        await this.showToast('Failed to add to Watchlist', 'danger');
      }

    });
  }

  markAsWatched() {

    if (!this.movie) return;

    const movieDto = {
      imdbId: this.movie.imdbId || this.movie.imdbID,
      title: this.movie.title || this.movie.Title,
      year: this.movie.year || this.movie.Year,
      poster: this.movie.poster || this.movie.Poster,
      actors: this.movie.actors || this.movie.Actors,
      genre: this.movie.genre || this.movie.Genre
    };

    this.watchedService.markAsWatched(movieDto).subscribe({

      next: async () => {
        await this.showToast('Marked as Watched!', 'success');
      },

      error: async (err) => {
        console.error(err);
        await this.showToast('Failed to mark as watched', 'danger');
      }

    });
  }

  private async showToast(
    message: string,
    color: 'success' | 'danger' = 'success'
  ) {

    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });

    await toast.present();
  }
}