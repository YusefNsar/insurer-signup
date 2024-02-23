import { Component, OnInit } from '@angular/core'
import {
  CompanyForms,
  RegisteredFormsService,
} from '../../registered-forms.service'

@Component({
  selector: 'app-registered-forms',
  templateUrl: './registered-forms.component.html',
  styleUrl: './registered-forms.component.scss',
})
export class RegisteredFormsComponent implements OnInit {
  constructor(public rf: RegisteredFormsService) {}

  ngOnInit(): void {
    this.rf.getAllForms().subscribe(forms => {
      this.data = forms
      this.companyNameFiltersOptions = this.data.map(d => d.companyName)
    })
    // this.rf.getFormById('1').subscribe(form => console.log('found it', form))
  }

  data: CompanyForms[] = []

  updateCompanyName(option: string | null) {
    this.activeCompanyName = option
    this.data = this.rf.filterForms({
      companyName: this.activeCompanyName,
      status: this.activeStatus,
    })
    this.companyNameFiltersOptions = this.data.map(d => d.companyName)
  }

  updateStatusFilter(option: string | null) {
    this.activeStatus = option;
    this.data = this.rf.filterForms({
      companyName: this.activeCompanyName,
      status: this.activeStatus,
    });
    
    this.companyNameFiltersOptions = this.data.map(d => d.companyName);
  }
  updateStatus(formIdToUpdate : string , option : string)
  {
    this.activeStatus = option;
    this.rf.updateFormStatus(formIdToUpdate, option).subscribe(
      success => {
        if (success) {
          const formToUpdate = this.data.find(f => f.id === formIdToUpdate);

          if (formToUpdate) {
            formToUpdate.status = option;
          }
          console.log('Form status updated successfully');
        } else {
          console.error('Failed to update form status');
        }
      }
    );
  }
  // company name filter
  companyNameFiltersOptions = this.data.map(d => d.companyName)
  activeCompanyName: string | null = null

  selectedOption: string | null = null

  // status filter
  statusOptions = ['pending', 'accepted', 'rejected']
  activeStatus: string | null = null
}
