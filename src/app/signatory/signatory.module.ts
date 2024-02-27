import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { LoginComponent } from './pages/login/login.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { SignupComponent } from './pages/signup/signup.component'
import { ForgotComponent } from './pages/forgot/forgot.component'
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component'
import { ChangePasswordComponent } from './components/change-password/change-password.component'
import { AuthGuard } from '../shared/guards/auth.guard'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component'
import { ToastrModule } from 'ngx-toastr'
import { SignatoryGuard } from '../shared/guards/signatory.guard'

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
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot', component: ForgotComponent },
      { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard, SignatoryGuard],
      },
      { path: '**', redirectTo: 'login' },
    ]),
  ],
})
export class SignatoryModule {}
