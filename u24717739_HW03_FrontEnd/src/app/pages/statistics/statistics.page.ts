import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StatisticsService } from '../../services/statistics';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class StatisticsPage implements OnInit {

  @ViewChild('genrePieChart') genrePieChart!: ElementRef<HTMLCanvasElement>;

  stats: any = null;
  topGenres: any[] = [];
  isLoading = false;
  errorMessage = '';
  pieChart: any;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loadStatistics();
  }

  loadStatistics() {
    this.isLoading = true;
    this.errorMessage = '';

    this.statisticsService.getStatistics().subscribe({
      next: (data) => {
        this.stats = data;
        this.topGenres = data?.topGenres || [];
        this.isLoading = false;
        setTimeout(() => this.createPieChart(), 300);
      },
      error: (err) => {
        console.error('Statistics error:', err);
        this.errorMessage = 'Failed to load statistics. Please try again.';
        this.isLoading = false;
      }
    });
  }

     createPieChart() {
    if (this.pieChart) this.pieChart.destroy();

    const ctx = this.genrePieChart?.nativeElement?.getContext('2d');
    if (!ctx || this.topGenres.length === 0) return;

    const backgroundColors = this.topGenres.map(g => this.getColor(g.genre));

    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.topGenres.map(g => g.genre),
        datasets: [{
          data: this.topGenres.map(g => g.count),
          backgroundColor: backgroundColors,
          borderColor: '#1f1f1f',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } }
      }
    });
  }

      getColor(genre: string): string {
    const colors: any = {
      'Action': '#ef4444',
      'Drama': '#3b82f6',
      'Sci-Fi': '#8b5cf6',
      'Comedy': '#eab308',
      'Thriller': '#10b981',
      'Horror': '#ec485b5e',
      'Romance': '#db2777',
      'Family': '#14b8a6',        
      'Mystery': '#6b7280',       
      'Adventure': '#f59f0b71',
      'Fantasy': '#a855f7',
      'Crime': '#f97316'
    };
    return colors[genre] || '#64748b';
  }
}