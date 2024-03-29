import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import {
  CompanyForms,
  RegisteredFormsService,
} from '../../registered-forms.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-company',
  templateUrl: './review-company.component.html',
  styleUrl: './review-company.component.scss',
})
export class ReviewCompanyComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public rf: RegisteredFormsService,
  ) {}

  ngOnInit(): void {
    // Retrieve route parameters
    const id = this.route.snapshot.paramMap.get('formId')

    this.rf.getFormById(id || '').subscribe(form => {
      if (form) this.company = form
    })
  }

  company!: CompanyForms

  documents = ['Report 1', 'Report 2']

  getNameFromUrl(url: string): string | undefined {
    return url.split('/').at(-1)?.split('.')[0]
  }
  updateStatus( option: string) {
    this.rf.updateFormStatus(this.company.id, option).subscribe(
      success => {
        if (success) {
          console.log('Form status updated successfully');
          this.router.navigate(['/back-office/registered-forms']);
        } else {
          console.error('Failed to update form status');
        }
      })

  }
}
