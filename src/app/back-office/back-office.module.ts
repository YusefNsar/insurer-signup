import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AdminLoginComponent } from './pages/admin-login/admin-login.component'
import { RegisteredFormsComponent } from './pages/registered-forms/registered-forms.component'
import { RouterModule } from '@angular/router'
import { ReviewCompanyComponent } from './pages/review-company/review-company.component'
import { CardComponent } from '../shared/card/card.component'
import { DocumentComponent } from '../shared/document/document.component'
import { DropdownRadioComponent } from '../shared/dropdown-radio/dropdown-radio.component'

@NgModule({
  declarations: [
    AdminLoginComponent,
    RegisteredFormsComponent,
    ReviewCompanyComponent,
  ],
  imports: [
    CommonModule,
    CardComponent,
    DocumentComponent,
    DropdownRadioComponent,
    RouterModule.forChild([
      { path: 'login', component: AdminLoginComponent },
      { path: 'registered-forms', component: RegisteredFormsComponent },
      { path: 'review/:formId', component: ReviewCompanyComponent },
      // { path: '**', redirectTo: 'login' },
      { path: '**', redirectTo: 'registered-forms' },
    ]),
  ],
})
export class BackOfficeModule {}
