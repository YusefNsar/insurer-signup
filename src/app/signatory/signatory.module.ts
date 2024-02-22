import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from './pages/login/login.component'
import { ProfileComponent } from './pages/profile/profile.component'
import { SignupComponent } from './pages/signup/signup.component'
import { RouterModule } from '@angular/router'
import { AuthGuard } from '../shared/auth-guard.guard'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component'
import { ToastrModule } from 'ngx-toastr'


@NgModule({
  declarations: [LoginComponent, ProfileComponent, SignupComponent ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
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
