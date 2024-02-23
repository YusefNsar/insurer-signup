import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-review-company',
  templateUrl: './review-company.component.html',
  styleUrl: './review-company.component.scss',
})
export class ReviewCompanyComponent {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve route parameters
    const id = this.route.snapshot.paramMap.get('formId')
    console.log('ID:', id)
  }

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
