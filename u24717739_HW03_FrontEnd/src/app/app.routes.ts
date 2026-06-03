import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) },
  { 
    path: 'tabs', 
    loadComponent: () => import('./pages/tabs/tabs.page').then(m => m.TabsPage),
    children: [
      { path: 'search', loadComponent: () => import('./pages/search/search.page').then(m => m.SearchPage) },
      { path: 'watchlist', loadComponent: () => import('./pages/watchlist/watchlist.page').then(m => m.WatchlistPage) },
      { path: 'watched', loadComponent: () => import('./pages/watched/watched.page').then(m => m.WatchedPage) },
      { path: 'statistics', loadComponent: () => import('./pages/statistics/statistics.page').then(m => m.StatisticsPage) },
      { path: '', redirectTo: 'search', pathMatch: 'full' }
    ]
  },
  { path: 'movie-details', loadComponent: () => import('./pages/movie-details/movie-details.page').then(m => m.MovieDetailsPage) }
];