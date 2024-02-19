import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './pages/login/login.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { SignupComponent } from './pages/signup/signup.component'
import { RouterModule } from '@angular/router'
import { AuthGuard } from '../shared/auth-guard.guard'
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component'

@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    ProfileDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      { path: '**', redirectTo: 'login' },
    ]),
  ],
})
export class SignatoryModule {}
