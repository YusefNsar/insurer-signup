import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { config } from '../shared/config'
import { of, map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class RegisteredFormsService {
  companyForms: CompanyForms[] = []
  loading = true

  constructor(private http: HttpClient) {}

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
    companyName: string
    status: string
  }) {
    return this.companyForms.find(
      f => f.companyName == companyName || f.status === status,
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
