import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService, User } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-recruiter-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="recruiter-profile">
      <div class="profile-header">
        <div class="header-content">
          <h1>Recruiter Profile</h1>
          <div class="navigation-buttons">
            <button class="nav-btn" (click)="goToHomepage()">Back to Homepage</button>
            <button class="nav-btn logout-btn" (click)="logout()">Logout</button>
          </div>
        </div>
      </div>

      <div class="content-wrapper">
        <div class="profile-section">
          <div class="profile-card">
            <div class="card-header">
              <h2>Profile Information</h2>
              <button class="btn btn-secondary" (click)="toggleEdit()" *ngIf="!isEditing">
                Edit Profile
              </button>
            </div>

            <div class="error-message" *ngIf="errorMessage">
              {{ errorMessage }}
            </div>

            <div class="success-message" *ngIf="successMessage">
              {{ successMessage }}
            </div>

            <form [formGroup]="profileForm" (ngSubmit)="saveProfile()" *ngIf="isEditing">
              <div class="form-group">
                <label for="name">Full Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  formControlName="name"
                  [class.error]="profileForm.get('name')?.invalid && profileForm.get('name')?.touched">
                <div class="error-message" *ngIf="profileForm.get('name')?.invalid && profileForm.get('name')?.touched">
                  <span *ngIf="profileForm.get('name')?.errors?.['required']">Name is required</span>
                  <span *ngIf="profileForm.get('name')?.errors?.['minlength']">Name must be at least 2 characters</span>
                </div>
              </div>

              <div class="form-group">
                <label for="email">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  formControlName="email"
                  [class.error]="profileForm.get('email')?.invalid && profileForm.get('email')?.touched">
                <div class="error-message" *ngIf="profileForm.get('email')?.invalid && profileForm.get('email')?.touched">
                  <span *ngIf="profileForm.get('email')?.errors?.['required']">Email is required</span>
                  <span *ngIf="profileForm.get('email')?.errors?.['email']">Please enter a valid email</span>
                </div>
              </div>

              <div class="form-actions">
                <button type="button" class="btn btn-secondary" (click)="cancelEdit()">Cancel</button>
                <button type="submit" class="btn btn-primary" [disabled]="profileForm.invalid || isLoading">
                  <span *ngIf="isLoading">Saving...</span>
                  <span *ngIf="!isLoading">Save Changes</span>
                </button>
              </div>
            </form>

            <div class="profile-display" *ngIf="!isEditing && currentUser">
              <div class="profile-info">
                <div class="info-item">
                  <label>Full Name:</label>
                  <span>{{ currentUser.name }}</span>
                </div>
                <div class="info-item">
                  <label>Email Address:</label>
                  <span>{{ currentUser.email }}</span>
                </div>
                <div class="info-item">
                  <label>Role:</label>
                  <span>{{ currentUser.role }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .recruiter-profile {
      min-height: 100vh;
      background-color: #f7fafc;
    }

    .profile-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px 0;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-content h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }

    .navigation-buttons {
      display: flex;
      gap: 10px;
    }

    .nav-btn {
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s ease;
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
      font-size: 14px;
    }

    .nav-btn:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }

    .content-wrapper {
      max-width: 800px;
      margin: 0 auto;
      padding: 30px 20px;
    }

    .profile-section {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }

    .profile-card {
      padding: 30px;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e2e8f0;
    }

    .card-header h2 {
      margin: 0;
      color: #2d3748;
      font-size: 22px;
      font-weight: 600;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: #2d3748;
    }

    .form-group input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.2s ease;
      box-sizing: border-box;
    }

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
    }

    .form-group input.error {
      border-color: #e53e3e;
    }

    .error-message {
      color: #e53e3e;
      font-size: 12px;
      margin-top: 5px;
    }

    .success-message {
      background-color: #c6f6d5;
      color: #22543d;
      padding: 12px 16px;
      border-radius: 6px;
      margin-bottom: 20px;
      border-left: 4px solid #38a169;
    }

    .form-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
    }

    .btn {
      padding: 10px 20px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s ease;
      font-size: 14px;
    }

    .btn.primary {
      background-color: #667eea;
      color: white;
    }

    .btn.primary:hover:not(:disabled) {
      background-color: #5a67d8;
    }

    .btn.primary:disabled {
      background-color: #a0aec0;
      cursor: not-allowed;
    }

    .btn.secondary {
      background-color: #e2e8f0;
      color: #4a5568;
    }

    .btn.secondary:hover {
      background-color: #cbd5e0;
    }

    .profile-display {
      padding: 20px 0;
    }

    .profile-info {
      display: grid;
      gap: 20px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .info-item label {
      font-weight: 600;
      color: #4a5568;
      font-size: 14px;
    }

    .info-item span {
      color: #2d3748;
      font-size: 16px;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }
      
      .card-header {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
      }
      
      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class RecruiterProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  currentUser: User | null = null;
  profileForm: FormGroup;
  isLoading = false;
  isEditing = false;
  errorMessage = '';
  successMessage = '';

  constructor() {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        this.router.navigate(['/login']);
        return;
      }
      
      if (user.role !== 'Recruiter') {
        this.router.navigate(['/unauthorized']);
        return;
      }

      this.loadProfile();
    });
  }

  loadProfile() {
    if (!this.currentUser) return;

    this.isLoading = true;
    this.http.get(`${environment.apiUrl}/recruiter/${this.currentUser.id}/profile`).subscribe({
      next: (response: any) => {
        console.log('Profile data:', response);
        this.isLoading = false;
        
        if (response.user) {
          this.currentUser = { ...this.currentUser, ...response.user };
          this.profileForm.patchValue({
            name: response.user.name,
            email: response.user.email
          });
        }
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.isLoading = false;
        this.errorMessage = 'Failed to load profile data. Please try again.';
      }
    });
  }

  toggleEdit() {
    this.isEditing = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    if (this.currentUser) {
      this.profileForm.patchValue({
        name: this.currentUser.name,
        email: this.currentUser.email
      });
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.errorMessage = '';
    this.successMessage = '';
    this.profileForm.reset();
  }

  saveProfile() {
    if (!this.profileForm.valid || !this.currentUser) return;

    this.isLoading = true;
    const profileData = this.profileForm.value;

    this.http.put(`${environment.apiUrl}/recruiter/${this.currentUser.id}/profile`, profileData).subscribe({
      next: (response: any) => {
        console.log('Profile updated:', response);
        this.isLoading = false;
        this.isEditing = false;
        this.successMessage = 'Profile updated successfully!';
        
        if (response.user) {
          this.currentUser = { ...this.currentUser, ...response.user };
        }
        
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to update profile. Please try again.';
      }
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  goToHomepage() {
    this.router.navigate(['/recruiter/homepage']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
