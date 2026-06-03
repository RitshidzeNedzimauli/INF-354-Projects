import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {

  user = { 
    name: '',
    email: '', 
    password: '' 
  };

  isSignup = false;
  isLoading = false;
  showPassword = false;

  // Password validation
  hasLetter = false;
  hasNumber = false;
  hasSpecial = false;

  // Password Strength Bar
  passwordStrength = 0;
  passwordStrengthText = '';
  passwordStrengthColor = 'danger';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  async submit() {
    if (!this.validateForm()) return;

    this.isLoading = true;

    try {
      let response: any;

      if (this.isSignup) {
        response = await firstValueFrom(
          this.authService.register(this.user.name, this.user.email, this.user.password)
        );
      } else {
        response = await firstValueFrom(
          this.authService.login(this.user.email, this.user.password)
        );
      }

      if (response?.success) {
        await this.showToast(
          this.isSignup ? 'Account created successfully!' : 'Login successful!', 
          'success'
        );
        this.router.navigateByUrl('/tabs/search', { replaceUrl: true });
      } else {
        await this.showToast(response?.message || 'Operation failed', 'danger');
      }
    } catch (error: any) {
      console.error(error);
      const msg = error?.error?.message || error?.error?.Message || 'Request failed. Please try again.';
      await this.showToast(msg, 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  private validateForm(): boolean {
    if (!this.user.email || !this.user.password) {
      this.showToast('Email and password are required', 'warning');
      return false;
    }

    if (this.isSignup && !this.user.name?.trim()) {
      this.showToast('Name is required for registration', 'warning');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.user.email)) {
      this.showToast('Please enter a valid email address', 'warning');
      return false;
    }

    const password = this.user.password;
    if (password.length < 6) {
      this.showToast('Password must be at least 6 characters long', 'warning');
      return false;
    }

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasLetter || !hasNumber || !hasSpecial) {
      this.showToast('Password must contain at least one letter, one number, and one special character', 'warning');
      return false;
    }

    return true;
  }

  onPasswordChange() {
    const password = this.user.password || '';
    
    this.hasLetter = /[a-zA-Z]/.test(password);
    this.hasNumber = /[0-9]/.test(password);
    this.hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    this.calculatePasswordStrength();
  }

  private calculatePasswordStrength() {
    const password = this.user.password || '';
    let strength = 0;

    if (password.length >= 6) strength += 25;
    if (/[a-zA-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25;

    this.passwordStrength = strength;

    if (strength <= 40) {
      this.passwordStrengthText = 'Weak';
      this.passwordStrengthColor = 'danger';
    } else if (strength <= 70) {
      this.passwordStrengthText = 'Medium';
      this.passwordStrengthColor = 'warning';
    } else {
      this.passwordStrengthText = 'Strong';
      this.passwordStrengthColor = 'success';
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleMode() {
    this.isSignup = !this.isSignup;
    if (!this.isSignup) {
      this.user.name = '';
    }
  }

  private async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    await toast.present();
  }
}