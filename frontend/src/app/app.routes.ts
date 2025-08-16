import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { StudentProfileComponent } from './components/student/student-profile.component';
import { StudentHomepageComponent } from './components/student/student-homepage.component';
import { StudentAllCoursesComponent } from './components/student/student-all-courses.component';
import { StudentAllJobsComponent } from './components/student/student-all-jobs.component';
import { RecruiterHomepageComponent } from './components/recruiter/recruiter-homepage.component';
import { RecruiterProfileComponent } from './components/recruiter/recruiter-profile.component';
import { JobApplicantsComponent } from './components/recruiter/job-applicants.component';
import { UnauthorizedComponent } from './components/shared/unauthorized.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { 
    path: 'student/homepage', 
    component: StudentHomepageComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'student' }
  },
  { 
    path: 'student/profile', 
    component: StudentProfileComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'student' }
  },
  { 
    path: 'student/all-courses', 
    component: StudentAllCoursesComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'student' }
  },
  { 
    path: 'student/all-jobs', 
    component: StudentAllJobsComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'student' }
  },
  { 
    path: 'recruiter/homepage', 
    component: RecruiterHomepageComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'recruiter' }
  },
  { 
    path: 'recruiter/profile', 
    component: RecruiterProfileComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'recruiter' }
  },
  { 
    path: 'recruiter/job/:jobId/applicants', 
    component: JobApplicantsComponent,
    canActivate: [authGuard, roleGuard],
    data: { role: 'recruiter' }
  },
  { path: '**', redirectTo: '/login' }
];
