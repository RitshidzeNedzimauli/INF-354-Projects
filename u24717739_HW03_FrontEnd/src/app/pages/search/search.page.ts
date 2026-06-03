import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SearchPage {

  query: string = '';
  movies: any[] = [];
  featured: any = null;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  onSearchChange() {
    if (!this.query?.trim()) {
      this.clearResults();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.movieService.searchMovies(this.query).subscribe({
      next: (movies) => {
        this.movies = movies || [];
        this.featured = this.movies.length > 0 ? this.movies[0] : null;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Search error:', err);
        this.errorMessage = 'Failed to load movies. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  private clearResults() {
    this.movies = [];
    this.featured = null;
    this.errorMessage = '';
  }

  openMovie(movie: any) {
    this.router.navigate(['/movie-details'], { 
      state: { movie } 
    });
  }
}