import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface JobApplicant {
  _id: string;
  name: string;
  email: string;
}

interface JobDetails {
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
}

@Component({
  selector: 'app-job-applicants',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="job-applicants-container">
      <div class="header">
        <button class="back-btn" (click)="goBack()">← Back</button>
        <h1>Job Applicants</h1>
      </div>

      <div *ngIf="jobDetails" class="job-details-card">
        <h2>{{jobDetails.title}}</h2>
        <p class="company">{{jobDetails.company}}</p>
        <p class="location">📍 {{jobDetails.location}}</p>
        <p class="salary">💰 {{jobDetails.salary}}</p>
        <p class="description">{{jobDetails.description}}</p>
      </div>

      <div class="applicants-section">
        <h3>Applicants ({{applicants.length}})</h3>
        
        <div *ngIf="applicants.length > 0; else noApplicants" class="applicants-list">
          <div *ngFor="let applicant of applicants" class="applicant-card">
            <div class="applicant-info">
              <h4>{{applicant.name}}</h4>
              <p class="email">✉️ {{applicant.email}}</p>
            </div>
            <div class="applicant-actions">
              <button class="contact-btn" (click)="contactApplicant(applicant.email)">
                Contact
              </button>
            </div>
          </div>
        </div>

        <ng-template #noApplicants>
          <p class="no-applicants">No applicants yet for this job.</p>
        </ng-template>
      </div>

      <div *ngIf="isLoading" class="loading">
        <p>Loading applicants...</p>
      </div>

      <div *ngIf="errorMessage" class="error">
        <p>{{errorMessage}}</p>
      </div>
    </div>
  `,
  styles: [`
    .job-applicants-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f7fafc;
      min-height: 100vh;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 30px;
    }

    .back-btn {
      background-color: #4299e1;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }

    .back-btn:hover {
      background-color: #3182ce;
    }

    .header h1 {
      margin: 0;
      color: #2d3748;
      font-size: 28px;
      font-weight: 700;
    }

    .job-details-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      margin-bottom: 30px;
    }

    .job-details-card h2 {
      margin: 0 0 10px 0;
      color: #2d3748;
      font-size: 24px;
      font-weight: 600;
    }

    .company {
      font-size: 18px;
      font-weight: 500;
      color: #4299e1;
      margin: 8px 0;
    }

    .location, .salary {
      margin: 8px 0;
      color: #4a5568;
      font-size: 16px;
    }

    .description {
      margin-top: 15px;
      line-height: 1.6;
      color: #4a5568;
    }

    .applicants-section {
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .applicants-section h3 {
      margin-top: 0;
      margin-bottom: 20px;
      color: #2d3748;
      font-size: 20px;
      font-weight: 600;
    }

    .applicants-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .applicant-card {
      border: 1px solid #e2e8f0;
      padding: 20px;
      border-radius: 8px;
      background-color: #f8fafc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.2s ease;
    }

    .applicant-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-1px);
    }

    .applicant-info h4 {
      margin: 0 0 8px 0;
      color: #2d3748;
      font-size: 18px;
      font-weight: 600;
    }

    .email {
      margin: 0;
      color: #4a5568;
      font-size: 14px;
    }

    .applicant-actions {
      display: flex;
      gap: 10px;
    }

    .contact-btn {
      background-color: #48bb78;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }

    .contact-btn:hover {
      background-color: #38a169;
    }

    .no-applicants {
      text-align: center;
      color: #718096;
      font-style: italic;
      padding: 40px 20px;
    }

    .loading {
      text-align: center;
      padding: 40px 20px;
      color: #4a5568;
    }

    .error {
      background-color: #fed7d7;
      color: #c53030;
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
      text-align: center;
    }
  `]
})
export class JobApplicantsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);

  jobDetails: JobDetails | null = null;
  applicants: JobApplicant[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('jobId');
    if (jobId) {
      this.loadJobApplicants(jobId);
    }
  }

  loadJobApplicants(jobId: string) {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.get<{ success: boolean; data: { job: JobDetails; applicants: JobApplicant[] } }>
      (`${environment.apiUrl}/recruiter/job/${jobId}/applicants`)
      .subscribe({
        next: (response) => {
          this.jobDetails = response.data.job;
          this.applicants = response.data.applicants;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Failed to load job applicants:', error);
          this.errorMessage = 'Failed to load job applicants. Please try again.';
          this.isLoading = false;
        }
      });
  }

  contactApplicant(email: string) {
    window.location.href = `mailto:${email}`;
  }

  goBack() {
    this.router.navigate(['/recruiter/homepage']);
  }
}
