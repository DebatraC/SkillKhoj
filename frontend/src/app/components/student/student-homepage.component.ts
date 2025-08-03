import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User, Course } from '../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-student-homepage',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="student-homepage">
      <div class="homepage-header">
        <div class="header-content">
          <h1>Welcome, {{currentUser?.name}}!</h1>
          <div class="navigation-buttons">
            <button class="nav-btn courses-btn" (click)="goToAllCourses()">View All Courses</button>
            <button class="nav-btn profile-btn" (click)="goToProfile()">View Profile</button>
            <button class="nav-btn logout-btn" (click)="logout()">Logout</button>
          </div>
        </div>
      </div>
      
      <div class="content-wrapper">
        <div class="courses-section">
          <h2>Your Registered Courses</h2>
          <div *ngIf="(currentUser?.registeredCourses?.length ?? 0) > 0; else noCourses">
            <div *ngFor="let course of currentUser?.registeredCourses" class="course-card">
              <h3>{{course.title}}</h3>
              <p>{{course.description}}</p>
              <div *ngIf="course.instructor" class="course-meta">
                <span><strong>Instructor:</strong> {{course.instructor}}</span>
              </div>
              <div *ngIf="course.duration" class="course-meta">
                <span><strong>Duration:</strong> {{course.duration}}</span>
              </div>
            </div>
          </div>
          <ng-template #noCourses>
            <p class="no-content">No registered courses yet.</p>
          </ng-template>
        </div>

        <div class="recommended-section">
          <h2>Recommended Courses</h2>
          <div *ngIf="(currentUser?.recommendedCourses?.length ?? 0) > 0; else noRecommended">
            <div *ngFor="let course of currentUser?.recommendedCourses" class="course-card">
              <h3>{{course.title}}</h3>
              <p>{{course.description}}</p>
              <div *ngIf="course.instructor" class="course-meta">
                <span><strong>Instructor:</strong> {{course.instructor}}</span>
              </div>
              <div *ngIf="course.duration" class="course-meta">
                <span><strong>Duration:</strong> {{course.duration}}</span>
              </div>
              <button class="enroll-btn" (click)="enrollInCourse(course.id)">Enroll</button>
            </div>
          </div>
          <ng-template #noRecommended>
            <p class="no-content">No recommended courses available.</p>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .student-homepage {
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
      text-decoration: none;
      font-size: 14px;
    }

    .profile-btn {
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
    }

    .profile-btn:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }

    .logout-btn {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .logout-btn:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .content-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      padding: 30px 20px;
    }
    
    .courses-section, .recommended-section {
      margin: 30px 0;
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }

    .courses-section h2, .recommended-section h2 {
      margin-top: 0;
      margin-bottom: 20px;
      color: #2d3748;
      font-size: 22px;
      font-weight: 600;
    }
    
    .course-card {
      border: 1px solid #e2e8f0;
      padding: 20px;
      margin: 15px 0;
      border-radius: 8px;
      background-color: #f8fafc;
      transition: all 0.2s ease;
    }

    .course-card:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
    
    .course-card h3 {
      margin: 0 0 10px 0;
      color: #2d3748;
      font-size: 18px;
      font-weight: 600;
    }

    .course-card p {
      margin: 0 0 15px 0;
      color: #4a5568;
      line-height: 1.5;
    }

    .course-meta {
      margin: 8px 0;
      font-size: 14px;
      color: #718096;
    }

    .course-meta span {
      display: inline-block;
    }
    
    .enroll-btn {
      background-color: #48bb78;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s ease;
      margin-top: 10px;
    }
    
    .enroll-btn:hover {
      background-color: #38a169;
    }

    .no-content {
      color: #718096;
      font-style: italic;
      text-align: center;
      padding: 20px;
    }
  `]
})
export class StudentHomepageComponent implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);
  
  currentUser: User | null = null;
  // registeredCourses: Course[] = [];
  // recommendedCourses: Course[] = [];
  isLoading = false;
  errorMessage = '';

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser?.registeredCourses)
      if (this.currentUser) {
        this.loadStudentData(this.currentUser);
      }
    });
  }

  loadStudentData(user: User) {
    this.isLoading = true;
    this.errorMessage = '';
    console.log('Loading student data for user ID:', user.id);
    
    // With interceptor, no need to manually add headers
    this.http.get(`http://localhost:5000/api/student/${user.id}/homepage`).subscribe({
      next: (response: any) => {
        console.log("Full API Response:", response);
        
        // Handle both response formats
        if (response.user) {
          // New format: { user: { ...userData } }
          this.currentUser = response.user;
          console.log("Using response.user format");
        } else if (response.registeredCourses !== undefined) {
          // Old format: { registeredCourses: [], recommendedCourses: [] }
          if (this.currentUser) {
            this.currentUser = {
              ...this.currentUser,
              registeredCourses: response.registeredCourses || [],
              recommendedCourses: response.recommendedCourses || []
            };
          }
          console.log("Using legacy response format");
        }
        
        console.log("Final currentUser:", this.currentUser);
        console.log("Registered courses count:", this.currentUser?.registeredCourses?.length);
        console.log("Recommended courses count:", this.currentUser?.recommendedCourses?.length);
        
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load homepage data';
        this.isLoading = false;
        console.error('Error loading student data:', error);
      }
    });
  }

  enrollInCourse(courseId: string) {
    if (!this.currentUser) return;
    
    // Add enrollment logic here
    console.log('Enrolling in course:', courseId);
  }

  goToProfile() {
    this.router.navigate(['/student/profile']);
  }

  goToAllCourses() {
    this.router.navigate(['/student/all-courses']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
