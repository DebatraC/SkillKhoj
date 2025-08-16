import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService, User } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

interface JobPosting {
  _id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  postedBy: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-student-all-jobs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="all-jobs-page">
      <div class="jobs-header">
        <div class="header-content">
          <h1>All Available Jobs</h1>
          <div class="navigation-buttons">
            <button class="nav-btn back-btn" (click)="goToHomepage()">Back to Homepage</button>
            <button class="nav-btn courses-btn" (click)="goToAllCourses()">View Courses</button>
            <button class="nav-btn profile-btn" (click)="goToProfile()">View Profile</button>
            <button class="nav-btn logout-btn" (click)="logout()">Logout</button>
          </div>
        </div>
      </div>
      
      <div class="content-wrapper">
        <div class="jobs-section">
          <div class="loading-message" *ngIf="isLoading">
            Loading job opportunities...
          </div>

          <div class="error-message" *ngIf="errorMessage">
            {{errorMessage}}
          </div>

          <div *ngIf="!isLoading && !errorMessage">
            <div class="jobs-stats">
              <p>Found {{allJobs.length}} job{{allJobs.length !== 1 ? 's' : ''}} available</p>
            </div>

            <div *ngIf="allJobs.length > 0; else noJobs" class="jobs-grid">
              <div *ngFor="let job of allJobs" class="job-card">
                <div class="job-header">
                  <h3>{{job.title}}</h3>
                  <span class="job-date">{{job.createdAt | date:'short'}}</span>
                </div>
                <div class="job-content">
                  <div class="company-info">
                    <h4>{{job.company}}</h4>
                    <p class="job-location">📍 {{job.location}}</p>
                    <p class="job-salary">💰 {{job.salary}}</p>
                  </div>
                  <p class="job-description">{{job.description}}</p>
                  <div class="recruiter-info">
                    <p class="posted-by">
                      <strong>Posted by:</strong> {{job.postedBy.name}}
                    </p>
                    <p class="contact-email">
                      <strong>Contact:</strong> {{job.postedBy.email}}
                    </p>
                  </div>
                </div>
                <div class="job-actions">
                  <button class="btn apply-btn" (click)="applyForJob(job._id)">
                    Apply Now
                  </button>
                  <button class="btn contact-btn" (click)="contactRecruiter(job.postedBy.email)">
                    Contact Recruiter
                  </button>
                </div>
              </div>
            </div>

            <ng-template #noJobs>
              <div class="no-jobs">
                <div class="no-jobs-icon">💼</div>
                <h3>No Job Opportunities Available</h3>
                <p>There are currently no job postings available. Check back later for new opportunities!</p>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .all-jobs-page {
      min-height: 100vh;
      background-color: #f7fafc;
    }

    .jobs-header {
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
      flex-wrap: wrap;
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

    .jobs-section {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .loading-message {
      text-align: center;
      padding: 40px;
      color: #4a5568;
      font-size: 16px;
    }

    .error-message {
      background-color: #fed7d7;
      color: #c53030;
      padding: 12px 16px;
      border-radius: 6px;
      margin-bottom: 20px;
      border-left: 4px solid #e53e3e;
    }

    .jobs-stats {
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e2e8f0;
    }

    .jobs-stats p {
      margin: 0;
      color: #4a5568;
      font-size: 14px;
    }

    .jobs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 20px;
    }

    .job-card {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 25px;
      background-color: #f8fafc;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .job-card:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
      border-color: #667eea;
    }

    .job-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e2e8f0;
    }

    .job-header h3 {
      margin: 0;
      color: #2d3748;
      font-size: 20px;
      font-weight: 600;
      line-height: 1.3;
      flex: 1;
    }

    .job-date {
      color: #718096;
      font-size: 12px;
      margin-left: 10px;
    }

    .job-content {
      flex-grow: 1;
      margin-bottom: 20px;
    }

    .company-info {
      margin-bottom: 15px;
    }

    .company-info h4 {
      margin: 0 0 8px 0;
      color: #2d3748;
      font-size: 18px;
      font-weight: 600;
    }

    .job-location,
    .job-salary {
      margin: 5px 0;
      color: #4a5568;
      font-size: 14px;
      font-weight: 500;
    }

    .job-description {
      color: #4a5568;
      line-height: 1.6;
      margin: 15px 0;
      font-size: 14px;
    }

    .recruiter-info {
      background-color: #edf2f7;
      padding: 12px;
      border-radius: 6px;
      margin-top: 15px;
    }

    .posted-by,
    .contact-email {
      margin: 5px 0;
      color: #4a5568;
      font-size: 13px;
    }

    .job-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    .btn {
      padding: 10px 16px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s ease;
      font-size: 14px;
    }

    .apply-btn {
      background-color: #667eea;
      color: white;
    }

    .apply-btn:hover {
      background-color: #5a67d8;
    }

    .contact-btn {
      background-color: #38a169;
      color: white;
    }

    .contact-btn:hover {
      background-color: #2f855a;
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
      margin: 0;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }
      
      .jobs-grid {
        grid-template-columns: 1fr;
      }
      
      .navigation-buttons {
        justify-content: center;
      }
      
      .job-header {
        flex-direction: column;
        gap: 10px;
      }
      
      .job-actions {
        flex-direction: column;
      }
    }
  `]
})
export class StudentAllJobsComponent implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);
  
  currentUser: User | null = null;
  allJobs: JobPosting[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        this.router.navigate(['/login']);
        return;
      }
      
      if (user.role !== 'Student') {
        this.router.navigate(['/unauthorized']);
        return;
      }

      this.loadAllJobs();
    });
  }

  loadAllJobs() {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.get(`${environment.apiUrl}/student/jobs`).subscribe({
      next: (response: any) => {
        console.log('All jobs data:', response);
        this.isLoading = false;
        
        if (response.success && response.data) {
          this.allJobs = response.data;
        } else {
          this.errorMessage = 'Failed to load jobs data.';
        }
      },
      error: (error) => {
        console.error('Error loading jobs:', error);
        this.isLoading = false;
        this.errorMessage = 'Failed to load jobs. Please try again.';
      }
    });
  }

  applyForJob(jobId: string) {
    if (!this.currentUser) {
      alert('Please log in to apply for jobs');
      return;
    }

    if (confirm('Are you sure you want to apply for this job?')) {
      this.http.post(`${environment.apiUrl}/student/${this.currentUser.id}/apply/${jobId}`, {
        coverLetter: '' // You can extend this to include a cover letter input
      }).subscribe({
        next: (response: any) => {
          alert('Application submitted successfully!');
          console.log('Application response:', response);
        },
        error: (error) => {
          console.error('Failed to apply for job:', error);
          if (error.error?.message) {
            alert(error.error.message);
          } else {
            alert('Failed to submit application. Please try again.');
          }
        }
      });
    }
  }

  contactRecruiter(email: string) {
    // Open email client with recruiter's email
    window.location.href = `mailto:${email}?subject=Inquiry about Job Opportunity`;
  }

  goToHomepage() {
    this.router.navigate(['/student/homepage']);
  }

  goToAllCourses() {
    this.router.navigate(['/student/all-courses']);
  }

  goToProfile() {
    this.router.navigate(['/student/profile']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
