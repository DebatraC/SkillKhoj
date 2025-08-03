import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { ProfileService, StudentProfile } from '../../services/profile.service';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.scss'
})
export class StudentProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  currentUser: User | null = null;
  profile: StudentProfile | null = null;
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
    // Check if user is authenticated
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        this.router.navigate(['/login']);
        return;
      }
      
      if (user.role !== 'Student') {
        this.errorMessage = 'Access denied. Student profile only.';
        return;
      }

      this.loadProfile();
    });
  }

  loadProfile() {
    if (!this.currentUser) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.profileService.getStudentProfile(this.currentUser.id).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.profileForm.patchValue({
          name: profile.name,
          email: profile.email
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to load profile';
        this.isLoading = false;
      }
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    this.successMessage = '';
    this.errorMessage = '';
    
    if (!this.isEditing && this.profile) {
      // Reset form to original values if canceling edit
      this.profileForm.patchValue({
        name: this.profile.name,
        email: this.profile.email
      });
    }
  }

  onSubmit() {
    if (!this.profileForm.valid || !this.currentUser) return;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.profileForm.value;
    
    this.profileService.updateStudentProfile(this.currentUser.id, formData).subscribe({
      next: (response) => {
        this.successMessage = 'Profile updated successfully!';
        this.isEditing = false;
        this.isLoading = false;
        this.loadProfile(); // Reload to get updated data
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Failed to update profile';
        this.isLoading = false;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goBack() {
    this.router.navigate(['/student/homepage']);
  }

  get name() { return this.profileForm.get('name'); }
  get email() { return this.profileForm.get('email'); }
}
