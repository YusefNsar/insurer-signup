import { CompanyForms as Signatory } from './../../../back-office/registered-forms.service'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss',
})
export class ProfileDetailsComponent {
  @Input({ required: true }) signatory!: Signatory
}
