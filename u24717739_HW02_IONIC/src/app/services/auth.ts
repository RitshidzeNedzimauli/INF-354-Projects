import { Injectable } from '@angular/core';
import { StorageService } from './storage';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private storage: StorageService) {}

  async signup(user: any): Promise<boolean> {
    try {
      await this.storage.set('currentUser', {
        email: user.email,
        name: user.email.split('@')[0] || 'User'
      });

      await this.storage.set('userCredentials', {
        email: user.email,
        password: user.password
      });

      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  }

  async login(user: any): Promise<boolean> {
    try {
      const savedCredentials = await this.storage.get('userCredentials');
      
      if (!savedCredentials) return false;

      const isValid = 
        savedCredentials.email === user.email && 
        savedCredentials.password === user.password;

      if (isValid) {
        await this.storage.set('currentUser', {
          email: user.email,
          name: user.email.split('@')[0] || 'User'
        });
      }

      return isValid;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  async isLoggedIn(): Promise<boolean> {
    const currentUser = await this.storage.get('currentUser');
    return !!currentUser;
  }

  async logout(): Promise<void> {
    await this.storage.remove('currentUser');
  }

  async getCurrentUser(): Promise<any> {
    return await this.storage.get('currentUser');
  }
}