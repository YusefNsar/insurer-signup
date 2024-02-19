import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { LoginComponent } from './pages/login/login.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { SignupComponent } from './pages/signup/signup.component'
import { ForgotComponent } from './pages/forgot/forgot.component'
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component'
import { ChangePasswordComponent } from './components/change-password/change-password.component'
import { AuthGuard } from '../shared/auth-guard.guard'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    SignupComponent,
    ForgotComponent,
    ProfileDetailsComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot', component: ForgotComponent },
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
