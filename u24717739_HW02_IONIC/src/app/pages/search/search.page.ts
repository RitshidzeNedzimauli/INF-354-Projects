import { Component } from '@angular/core';
import { MovieService } from 'src/app/services/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  standalone: false
})
export class SearchPage {

  query: string = '';
  movies: any[] = [];
  typingTimeout: any;

  featured: any = null;
  sections: { title: string; items: any[] }[] = [];

  constructor(private movieService: MovieService, private router: Router) {}

  open(movie: any) {
    this.router.navigate(['/movie-details'], { state: { movie } });
  }

  setSections(movies: any[]) {
    this.featured = movies?.[0];
    this.sections = [
      { title: 'Top Results', items: movies.slice(0, 10) },
      { title: 'More Like This', items: movies.slice(10, 20) }
    ];
  }

  onSearchChange() {
    clearTimeout(this.typingTimeout);

    this.typingTimeout = setTimeout(() => {

      if (!this.query.trim()) {
        this.movies = [];
        this.sections = [];
        this.featured = null;
        return;
      }

      this.movieService.searchMovies(this.query)
        .subscribe((res: any) => {
          const list = res.description || [];
          this.movies = list;
          this.setSections(list);
        });

    }, 400);
  }
}
