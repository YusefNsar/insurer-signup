import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { config } from '../shared/config'
import { of, map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class RegisteredFormsService {
  companyForms: CompanyForms[] = [
    {
      id: '0',
      companyName: 'Boody inc.',
      name: 'Mayora el shatora',
      email: 'mayora@boody.com',
      phoneNumber: '01126217669',
      workNumber: '01126217669',
      registeredAddress: 'Beet mayora',
      companyWebsite: 'eqeqeq',
      cbuaeLicense: 'eqeq123141',
      cbuaeLicenseExpiry: '2024-07-02T00:00:00Z',
      commercialLicense: 'qe123113131',
      commercialLicenseExpiry: '2001-07-16T00:00:00Z',
      documentsUrl: ['docs/20240222/0_0_b175442e82574290814a9cda0d06a961.pdf'],
      status: 'accepted',
    },
    {
      id: '1',
      companyName: 'Boody inc.',
      name: 'Mayora el shatora',
      email: 'mayora@boody.com',
      phoneNumber: '01126217669',
      workNumber: '01126217669',
      registeredAddress: 'Beet mayora',
      companyWebsite: 'eqeqeq',
      cbuaeLicense: 'eqeq123141',
      cbuaeLicenseExpiry: '2024-07-02T00:00:00Z',
      commercialLicense: 'qe123113131',
      commercialLicenseExpiry: '2001-07-16T00:00:00Z',
      documentsUrl: ['docs/20240222/1_0_bc4e9dfa18ab416e882767151072e026.pdf'],
      status: 'accepted',
    },
  ]

  loading = true

  constructor(private http: HttpClient) {}

  updateFormStatus(formId: string, newStatus: string): Observable<boolean> {
    this.loading=true
    const apiUrl = `${config.signatoryApi}/${formId}/status/${newStatus}`;

    return this.http.put(apiUrl, {}).pipe(
      
      map(() => true,this.loading = false), 
    );
  }

  getAllForms() {
    this.loading = true

    return this.http.get<CompanyForms[]>(config.signatoryApi).pipe(
      map(forms => {
        this.loading = false
        this.companyForms = forms
        return forms
      }),
    )
  }

  getFormById(formId: string) {
    const form = this.companyForms.find(f => f.id === formId)

    if (form) {
      return of(form)
    }

    return this.getAllForms().pipe(
      map(forms => forms.find(f => f.id === formId)),
    )
  }

  filterForms({
    companyName,
    status,
  }: {
    companyName: string | null
    status: string | null
  }) {
    return this.companyForms.filter(
      f =>
        (!companyName ||
          f.companyName.toLowerCase() == companyName.toLowerCase()) &&
        (!status || f.status.toLowerCase() === status.toLowerCase()),
    )
  }
}

export interface CompanyForms {
  id: string
  companyName: string
  name: string
  email: string
  phoneNumber: string
  workNumber: string
  registeredAddress: string
  companyWebsite: string
  cbuaeLicense: string
  cbuaeLicenseExpiry: string
  commercialLicense: string
  commercialLicenseExpiry: string
  documentsUrl: string[]
  status: string
}
