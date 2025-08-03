import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService, User, Course } from '../../services/auth.service';

@Component({
  selector: 'app-student-all-courses',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="all-courses-page">
      <div class="courses-header">
        <div class="header-content">
          <h1>All Available Courses</h1>
          <div class="navigation-buttons">
            <button class="nav-btn back-btn" (click)="goToHomepage()">Back to Homepage</button>
            <button class="nav-btn profile-btn" (click)="goToProfile()">View Profile</button>
            <button class="nav-btn logout-btn" (click)="logout()">Logout</button>
          </div>
        </div>
      </div>
      
      <div class="content-wrapper">
        <div class="courses-section">
          <div class="loading-message" *ngIf="isLoading">
            Loading courses...
          </div>

          <div class="error-message" *ngIf="errorMessage">
            {{errorMessage}}
          </div>

          <div *ngIf="!isLoading && !errorMessage">
            <div class="courses-stats">
              <p>Found {{allCourses.length}} course{{allCourses.length !== 1 ? 's' : ''}} available</p>
            </div>

            <div *ngIf="allCourses.length > 0; else noCourses" class="courses-grid">
              <div *ngFor="let course of allCourses" class="course-card">
                <div class="course-header">
                  <h3>{{course.title}}</h3>
                </div>
                <div class="course-content">
                  <p class="course-description">{{course.description}}</p>
                  <div class="course-meta" *ngIf="course.instructor">
                    <span class="meta-item">
                      <strong>👨‍🏫 Instructor:</strong> {{course.instructor}}
                    </span>
                  </div>
                  <div class="course-meta" *ngIf="course.duration">
                    <span class="meta-item">
                      <strong>⏱️ Duration:</strong> {{course.duration}}
                    </span>
                  </div>
                  <div class="course-meta" *ngIf="course.link">
                    <span class="meta-item">
                      <strong>🔗 Link:</strong> 
                      <a [href]="course.link" target="_blank" class="course-link">View Course</a>
                    </span>
                  </div>
                </div>
                <div class="course-actions">
                  <button class="btn enroll-btn" (click)="enrollInCourse(course.id)">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>

            <ng-template #noCourses>
              <div class="no-courses">
                <div class="no-courses-icon">📚</div>
                <h3>No Courses Available</h3>
                <p>There are currently no courses available in the system.</p>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .all-courses-page {
      min-height: 100vh;
      background-color: #f7fafc;
    }

    .courses-header {
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

    .courses-section {
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

    .courses-stats {
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e2e8f0;
    }

    .courses-stats p {
      margin: 0;
      color: #4a5568;
      font-size: 14px;
    }

    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 20px;
    }

    .course-card {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      background-color: #f8fafc;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .course-card:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
      border-color: #667eea;
    }

    .course-header {
      margin-bottom: 15px;
    }

    .course-header h3 {
      margin: 0;
      color: #2d3748;
      font-size: 18px;
      font-weight: 600;
      line-height: 1.3;
    }

    .course-content {
      flex-grow: 1;
      margin-bottom: 20px;
    }

    .course-description {
      color: #4a5568;
      line-height: 1.6;
      margin: 0 0 15px 0;
      font-size: 14px;
    }

    .course-meta {
      margin-bottom: 10px;
    }

    .meta-item {
      color: #4a5568;
      font-size: 13px;
      display: block;
      margin-bottom: 5px;
    }

    .course-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .course-link:hover {
      text-decoration: underline;
    }

    .course-actions {
      display: flex;
      justify-content: flex-end;
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

    .enroll-btn {
      background-color: #667eea;
      color: white;
    }

    .enroll-btn:hover {
      background-color: #5a67d8;
    }

    .no-courses {
      text-align: center;
      padding: 60px 20px;
      color: #718096;
    }

    .no-courses-icon {
      font-size: 48px;
      margin-bottom: 20px;
    }

    .no-courses h3 {
      color: #4a5568;
      margin: 0 0 10px 0;
    }

    .no-courses p {
      margin: 0;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }
      
      .courses-grid {
        grid-template-columns: 1fr;
      }
      
      .navigation-buttons {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  `]
})
export class StudentAllCoursesComponent implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);
  
  currentUser: User | null = null;
  allCourses: Course[] = [];
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

      this.loadAllCourses();
    });
  }

  loadAllCourses() {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.get('http://localhost:5000/api/courses').subscribe({
      next: (response: any) => {
        console.log('All courses data:', response);
        this.isLoading = false;
        
        if (response.success && response.data) {
          this.allCourses = response.data;
        } else {
          this.errorMessage = 'Failed to load courses data.';
        }
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        this.isLoading = false;
        this.errorMessage = 'Failed to load courses. Please try again.';
      }
    });
  }

  enrollInCourse(courseId: string) {
    // Add enrollment logic here
    console.log('Enrolling in course:', courseId);
    // TODO: Implement course enrollment API call
    alert('Enrollment functionality coming soon!');
  }

  goToHomepage() {
    this.router.navigate(['/student/homepage']);
  }

  goToProfile() {
    this.router.navigate(['/student/profile']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
