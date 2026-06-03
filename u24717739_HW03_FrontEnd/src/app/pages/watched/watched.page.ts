import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { WatchedService } from '../../services/watched';

@Component({
  selector: 'app-watched',
  templateUrl: './watched.page.html',
  styleUrls: ['./watched.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class WatchedPage {

  movies: any[] = [];
  isLoading = false;

  constructor(
    private watchedService: WatchedService,
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.loadWatched();
  }

  loadWatched() {
    this.isLoading = true;
    this.watchedService.getWatched().subscribe({
      next: (data) => {
        this.movies = data || [];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load watched list', err);
        this.showToast('Failed to load watched movies', 'danger');
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
      header: 'Remove Movie?',
      message: `Remove "${movie.title || movie.Title}" from Watched?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
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

  if (!imdbId) {
    this.showToast('Movie ID not found', 'danger');
    return;
  }

  this.watchedService.removeFromWatched(imdbId).subscribe({

    next: () => {
      this.showToast('Movie removed successfully', 'success');
      this.loadWatched();
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
      duration: 2500,
      color,
      position: 'top'
    });
    await toast.present();
  }
}