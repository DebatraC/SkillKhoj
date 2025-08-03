import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="unauthorized-container">
      <div class="unauthorized-card">
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
        <div class="actions">
          <!-- <button class="btn primary" (click)="goToHomepage()">Go to Homepage</button>
          <button class="btn secondary" (click)="logout()">Logout</button> -->
        </div>
      </div>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f7fafc;
    }
    
    .unauthorized-card {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      text-align: center;
      max-width: 400px;
    }
    
    .unauthorized-card h2 {
      color: #e53e3e;
      margin-bottom: 16px;
    }
    
    .unauthorized-card p {
      color: #4a5568;
      margin-bottom: 24px;
    }
    
    .actions {
      display: flex;
      gap: 12px;
      justify-content: center;
    }
    
    .btn {
      padding: 10px 20px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    
    .btn.primary {
      background-color: #3182ce;
      color: white;
    }
    
    .btn.primary:hover {
      background-color: #2b77cb;
    }
    
    .btn.secondary {
      background-color: #e2e8f0;
      color: #4a5568;
    }
    
    .btn.secondary:hover {
      background-color: #cbd5e0;
    }
  `]
})
export class UnauthorizedComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  goToHomepage() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        if (user.role.toLowerCase() === 'student') {
          this.router.navigate(['/student/homepage']);
        } else if (user.role.toLowerCase() === 'recruiter') {
          this.router.navigate(['/recruiter/homepage']);
        } else {
          this.router.navigate(['/login']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    }).unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
