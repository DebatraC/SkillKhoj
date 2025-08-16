import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface JobPosting {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  createdAt: Date;
}

@Component({
  selector: 'app-recruiter-homepage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="recruiter-homepage">
      <div class="homepage-header">
        <div class="header-content">
          <h1>Welcome, {{currentUser?.name}}!</h1>
          <div class="navigation-buttons">
            <button class="nav-btn profile-btn" (click)="goToProfile()">View Profile</button>
            <button class="nav-btn logout-btn" (click)="logout()">Logout</button>
          </div>
        </div>
      </div>
      
      <div class="content-wrapper">
        <!-- Job Creation Form -->
        <div class="create-job-section" *ngIf="showJobForm">
          <div class="job-form-card">
            <div class="form-header">
              <h2>Create New Job Posting</h2>
              <button class="close-btn" (click)="hideJobForm()">×</button>
            </div>
            
            <form [formGroup]="jobForm" (ngSubmit)="onSubmitJob()" class="job-form">
              <div class="form-group">
                <label for="title">Job Title *</label>
                <input 
                  type="text" 
                  id="title" 
                  formControlName="title" 
                  placeholder="e.g., Senior Software Engineer"
                  [class.error]="jobForm.get('title')?.invalid && jobForm.get('title')?.touched">
                <div class="error-message" *ngIf="jobForm.get('title')?.invalid && jobForm.get('title')?.touched">
                  Job title is required
                </div>
              </div>

              <div class="form-group">
                <label for="company">Company *</label>
                <input 
                  type="text" 
                  id="company" 
                  formControlName="company" 
                  placeholder="e.g., TechCorp Inc."
                  [class.error]="jobForm.get('company')?.invalid && jobForm.get('company')?.touched">
                <div class="error-message" *ngIf="jobForm.get('company')?.invalid && jobForm.get('company')?.touched">
                  Company name is required
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="location">Location *</label>
                  <input 
                    type="text" 
                    id="location" 
                    formControlName="location" 
                    placeholder="e.g., New York, NY"
                    [class.error]="jobForm.get('location')?.invalid && jobForm.get('location')?.touched">
                  <div class="error-message" *ngIf="jobForm.get('location')?.invalid && jobForm.get('location')?.touched">
                    Location is required
                  </div>
                </div>

                <div class="form-group">
                  <label for="salary">Salary *</label>
                  <input 
                    type="text" 
                    id="salary" 
                    formControlName="salary" 
                    placeholder="e.g., $80,000 - $120,000"
                    [class.error]="jobForm.get('salary')?.invalid && jobForm.get('salary')?.touched">
                  <div class="error-message" *ngIf="jobForm.get('salary')?.invalid && jobForm.get('salary')?.touched">
                    Salary is required
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="description">Job Description *</label>
                <textarea 
                  id="description" 
                  formControlName="description" 
                  rows="6"
                  placeholder="Describe the role, responsibilities, requirements..."
                  [class.error]="jobForm.get('description')?.invalid && jobForm.get('description')?.touched">
                </textarea>
                <div class="error-message" *ngIf="jobForm.get('description')?.invalid && jobForm.get('description')?.touched">
                  Job description is required
                </div>
              </div>

              <div class="form-actions">
                <button type="button" class="btn secondary" (click)="hideJobForm()">Cancel</button>
                <button type="submit" class="btn primary" [disabled]="jobForm.invalid || isSubmitting">
                  {{isSubmitting ? 'Creating...' : 'Create Job Posting'}}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Job Postings List -->
        <div class="job-postings-section">
          <div class="section-header">
            <h2>Your Job Postings</h2>
            <button class="btn primary" (click)="showJobForm = true" *ngIf="!showJobForm">
              + Create New Job Posting
            </button>
          </div>

          <div class="success-message" *ngIf="successMessage">
            {{successMessage}}
          </div>

          <div class="error-message" *ngIf="errorMessage">
            {{errorMessage}}
          </div>

          <div *ngIf="jobPostings.length > 0; else noJobs" class="jobs-grid">
            <div *ngFor="let job of jobPostings" class="job-card">
              <div class="job-header">
                <h3>{{job.title}}</h3>
                <span class="job-date">{{job.createdAt | date:'short'}}</span>
              </div>
              <div class="job-details">
                <p class="company"><strong>{{job.company}}</strong></p>
                <p class="location-salary">📍 {{job.location}} | 💰 {{job.salary}}</p>
                <p class="description">{{job.description}}</p>
              </div>
              <div class="job-actions">
                <button class="btn-small primary" (click)="viewJobApplicants(job.id)">View Applicants</button>
                <button class="btn-small secondary">Edit</button>
                <button class="btn-small danger">Delete</button>
              </div>
            </div>
          </div>

          <ng-template #noJobs>
            <div class="no-jobs">
              <div class="no-jobs-icon">📋</div>
              <h3>No Job Postings Yet</h3>
              <p>Create your first job posting to start attracting candidates!</p>
              <button class="btn primary" (click)="showJobForm = true">Create Your First Job</button>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .recruiter-homepage {
      min-height: 100vh;
      background-color: #f7fafc;
    }

    .homepage-header {
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
      max-width: 1200px;
      margin: 0 auto;
      padding: 30px 20px;
    }

    .create-job-section {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .job-form-card {
      background: white;
      border-radius: 12px;
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 30px;
      border-bottom: 1px solid #e2e8f0;
    }

    .form-header h2 {
      margin: 0;
      color: #2d3748;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #718096;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn:hover {
      color: #4a5568;
    }

    .job-form {
      padding: 30px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: #2d3748;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.2s ease;
      box-sizing: border-box;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #667eea;
    }

    .form-group input.error,
    .form-group textarea.error {
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

    .job-postings-section {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }

    .section-header h2 {
      margin: 0;
      color: #2d3748;
      font-size: 22px;
      font-weight: 600;
    }

    .jobs-grid {
      display: grid;
      gap: 20px;
    }

    .job-card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 20px;
      background-color: #f8fafc;
      transition: all 0.2s ease;
    }

    .job-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }

    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 15px;
    }

    .job-header h3 {
      margin: 0;
      color: #2d3748;
      font-size: 18px;
      font-weight: 600;
    }

    .job-date {
      color: #718096;
      font-size: 12px;
    }

    .job-details .company {
      color: #4a5568;
      font-size: 16px;
      margin: 0 0 8px 0;
    }

    .location-salary {
      color: #718096;
      font-size: 14px;
      margin: 0 0 12px 0;
    }

    .description {
      color: #4a5568;
      line-height: 1.5;
      margin: 0 0 15px 0;
    }

    .job-actions {
      display: flex;
      gap: 10px;
    }

    .btn-small {
      padding: 6px 12px;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .btn-small.secondary {
      background-color: #e2e8f0;
      color: #4a5568;
    }

    .btn-small.secondary:hover {
      background-color: #cbd5e0;
    }

    .btn-small.danger {
      background-color: #fed7d7;
      color: #c53030;
    }

    .btn-small.danger:hover {
      background-color: #feb2b2;
    }

    .btn-small.primary {
      background-color: #4299e1;
      color: white;
    }

    .btn-small.primary:hover {
      background-color: #3182ce;
    }

    .no-jobs {
      text-align: center;
      padding: 60px 20px;
      color: #718096;
    }

    .no-jobs-icon {
      font-size: 48px;
      margin-bottom: 20px;
    }

    .no-jobs h3 {
      color: #4a5568;
      margin: 0 0 10px 0;
    }

    .no-jobs p {
      margin: 0 0 30px 0;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .section-header {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
      }
      
      .job-header {
        flex-direction: column;
        gap: 10px;
      }
    }
  `]
})
export class RecruiterHomepageComponent implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  
  currentUser: User | null = null;
  jobPostings: JobPosting[] = [];
  showJobForm = false;
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  jobForm: FormGroup;

  constructor() {
    this.jobForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      company: ['', [Validators.required]],
      location: ['', [Validators.required]],
      salary: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadRecruiterData(user.id);
      }
    });
  }

  loadRecruiterData(userId: string) {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.get(`${environment.apiUrl}/recruiter/${userId}/homepage`).subscribe({
      next: (response: any) => {
        console.log("Recruiter data:", response);
        if (response.user) {
          this.currentUser = response.user;
          this.jobPostings = response.user.jobPostings || [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load homepage data';
        this.isLoading = false;
        console.error('Error loading recruiter data:', error);
      }
    });
  }

  onSubmitJob() {
    if (this.jobForm.valid && this.currentUser) {
      this.isSubmitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      const jobData = this.jobForm.value;

            this.http.post(`${environment.apiUrl}/recruiter/${this.currentUser.id}/createJobPosting`, jobData).subscribe({
        next: (response: any) => {
          this.successMessage = 'Job posting created successfully!';
          this.jobForm.reset();
          this.showJobForm = false;
          this.isSubmitting = false;
          
          // Reload the job postings
          this.loadRecruiterData(this.currentUser!.id);
          
          // Clear success message after 3 seconds
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          this.errorMessage = error.error?.message || 'Failed to create job posting';
          this.isSubmitting = false;
          console.error('Error creating job:', error);
        }
      });
    }
  }

  hideJobForm() {
    this.showJobForm = false;
    this.jobForm.reset();
    this.errorMessage = '';
  }

  viewJobApplicants(jobId: string) {
    this.router.navigate(['/recruiter/job', jobId, 'applicants']);
  }

  goToProfile() {
    if (this.currentUser) {
      this.router.navigate(['/recruiter/profile']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
