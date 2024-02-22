import { Component, Input } from '@angular/core'
import { Signatory } from '../../pages/profile/profile.component'

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss',
})
export class ProfileDetailsComponent {
  @Input({ required: true }) signatory!: Signatory
}
