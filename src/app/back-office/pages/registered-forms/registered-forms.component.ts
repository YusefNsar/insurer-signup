import { Component } from '@angular/core'

@Component({
  selector: 'app-registered-forms',
  templateUrl: './registered-forms.component.html',
  styleUrl: './registered-forms.component.scss',
})
export class RegisteredFormsComponent {
  data = [
    {
      id: '1',
      companyName: 'Company A',
      date: '2023-12-01',
      status: 'accepted',
      action: 'Edit',
      other: 'Extra Data 1',
    },
    {
      id: '2',
      companyName: 'Company B',
      date: '2023-12-02',
      status: 'rejected',
      action: 'Delete',
      other: 'Extra Data 2',
    },
    {
      id: '3',
      companyName: 'Company C',
      date: '2023-12-02',
      status: 'pending',
      action: 'Delete',
      other: 'Extra Data 2',
    },
    // Add more data objects as needed
  ]

  // company name filter
  companyNameFiltersOptions = this.data.map(d => d.companyName)
  activeCompanyName: string | null = null

  selectedOption: string | null = null

  // status filter
  statusOptions = ['pending', 'accepted', 'rejected']
  activeStatus: string | null = null
}
