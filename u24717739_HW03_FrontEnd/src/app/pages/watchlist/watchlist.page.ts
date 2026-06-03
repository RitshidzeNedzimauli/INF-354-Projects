import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { WatchlistService } from '../../services/watchlist';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class WatchlistPage {

  movies: any[] = [];
  isLoading = false;

  constructor(
    private watchlistService: WatchlistService,
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.loadWatchlist();
  }

  loadWatchlist() {
    this.isLoading = true;
    this.watchlistService.getWatchlist().subscribe({
      next: (data) => {
        this.movies = data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load watchlist', err);
        this.showToast('Failed to load watchlist', 'danger');
        this.isLoading = false;
      }
    });
  }

  openDetails(movie: any) {
    this.router.navigate(['/movie-details'], { 
      state: { movie } 
    });
  }

  async remove(movie: any) {
    const alert = await this.alertCtrl.create({
      header: 'Remove from Watchlist?',
      message: movie.title || movie.Title,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Remove',
          role: 'destructive',
          handler: () => this.confirmRemove(movie)
        }
      ]
    });

    await alert.present();
  }

  private confirmRemove(movie: any) {
    const imdbId = movie.imdbId || movie.ImdbId;
    if (!imdbId) return;

    this.watchlistService.removeFromWatchlist(imdbId).subscribe({
      next: () => {
        this.showToast('Movie removed from watchlist', 'success');
        this.loadWatchlist();
      },
      error: (err) => {
        console.error(err);
        this.showToast('Failed to remove movie', 'danger');
      }
    });
  }

  private async showToast(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    await toast.present();
  }
}