import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AdminLoginComponent } from './pages/admin-login/admin-login.component'
import { RegisteredFormsComponent } from './pages/registered-forms/registered-forms.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [AdminLoginComponent, RegisteredFormsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'login', component: AdminLoginComponent },
      { path: 'registered-forms', component: RegisteredFormsComponent },
      { path: '**', redirectTo: 'login' },
    ]),
  ],
})
export class BackOfficeModule {}
