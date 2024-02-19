import { Component } from '@angular/core'

@Component({
  selector: 'app-review-company',
  templateUrl: './review-company.component.html',
  styleUrl: './review-company.component.scss',
})
export class ReviewCompanyComponent {
  company = {
    name: 'axa',
    workNumber: 23355,
    registeredAddress: 'Dubai',
    email: 'axa@aue.com',
    phone: '9724355',
    authorizedRepresentative: 'ex',
    website: 'www.axa@aue.com',
    cvuae: '35545',
    commercialNumber: '3123',
    commercialExpiry: '23/2/2024',
  }

  documents = ['Report 1', 'Report 2']
}
