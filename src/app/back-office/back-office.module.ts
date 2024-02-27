import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RegisteredFormsComponent } from './pages/registered-forms/registered-forms.component'
import { RouterModule } from '@angular/router'
import { ReviewCompanyComponent } from './pages/review-company/review-company.component'
import { CardComponent } from '../shared/card/card.component'
import { DocumentComponent } from '../shared/document/document.component'
import { DropdownRadioComponent } from '../shared/dropdown-radio/dropdown-radio.component'
import { LogoutComponent } from './components/logout/logout.component'

@NgModule({
  declarations: [
    RegisteredFormsComponent,
    ReviewCompanyComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    CardComponent,
    DocumentComponent,
    DropdownRadioComponent,
    RouterModule.forChild([
      // { path: 'login', component: AdminLoginComponent },
      { path: '', redirectTo: 'registered-forms', pathMatch: 'full' },
      { path: 'registered-forms', component: RegisteredFormsComponent },
      { path: 'review/:formId', component: ReviewCompanyComponent },
      // { path: '**', redirectTo: 'login' },
      { path: '**', redirectTo: 'registered-forms' },
    ]),
  ],
})
export class BackOfficeModule {}
