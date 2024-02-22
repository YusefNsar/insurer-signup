import { Component } from '@angular/core'

@Component({
  selector: 'app-registered-forms',
  templateUrl: './registered-forms.component.html',
  styleUrl: './registered-forms.component.scss',
})
export class RegisteredFormsComponent {
  data = [
    {
      companyName: 'Company A',
      date: '2023-12-01',
      status: 'Active',
      action: 'Edit',
      other: 'Extra Data 1',
    },
    {
      companyName: 'Company B',
      date: '2023-12-02',
      status: 'Inactive',
      action: 'Delete',
      other: 'Extra Data 2',
    },
    // Add more data objects as needed
  ]
}
