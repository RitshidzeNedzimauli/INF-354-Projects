import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {

  user = { email: '', password: '' };
  isSignup = false;

  constructor(
    private auth: AuthService, 
    private router: Router
   ) 
  {}
  //   this.checkIfLoggedIn();
  // }

  // async checkIfLoggedIn() {
  //   const isLoggedIn = await this.auth.isLoggedIn();
  //   if (isLoggedIn) {
  //     this.router.navigateByUrl('/tabs/search', { replaceUrl: true });
  //   }
  // }

  async submit() {
    if (!this.user.email || !this.user.password) {
      alert('Please fill in both email and password');
      return;
    }

    if (this.isSignup) {
      const success = await this.auth.signup(this.user);
      if (success) {
        alert('Account created successfully!');
        this.router.navigateByUrl('/tabs/search', { replaceUrl: true });
      } else {
        alert('Signup failed. Please try again.');
      }
    } else {
      const ok = await this.auth.login(this.user);
      if (ok) {
        this.router.navigateByUrl('/tabs/search', { replaceUrl: true });
      } else {
        alert('Invalid email or password');
      }
    }
  }

  toggleMode() {
    this.isSignup = !this.isSignup;
  
  }
}
