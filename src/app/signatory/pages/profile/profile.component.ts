import { CompanyForms as Profile } from './../../../back-office/registered-forms.service'
import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { AuthService } from '@auth0/auth0-angular'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profile: Profile | null = null
  activeItem: string = 'profile'
  menuItems: MenuItem[] = menuItems
  isLoading: boolean = false

  constructor(
    private auth: AuthService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.isLoading = true
    this.http
      .get<Profile>('https://signupback.azurewebsites.net/api/Signatory/me')
      .subscribe(profile => {
        this.isLoading = false
        this.profile = profile
      })
  }

  setActiveItem = (newActive: string) => {
    this.activeItem = newActive
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } })
  }
}

// const defaultProfile = {
//   id: '0',
//   companyName: 'Boody inc.',
//   name: 'Mayora el shatora',
//   email: 'mayora@boody.com',
//   phoneNumber: '01126217669',
//   workNumber: '01126217669',
//   registeredAddress: 'Beet mayora',
//   companyWebsite: 'eqeqeq',
//   cbuaeLicense: 'eqeq123141',
//   cbuaeLicenseExpiry: '2001-07-02T00:00:00Z',
//   commercialLicense: 'qe123113131',
//   commercialLicenseExpiry: '2001-07-16T00:00:00Z',
//   documentsUrl: ['docs/20240222/0_0_b175442e82574290814a9cda0d06a961.pdf'],
//   status: 'Accepted',
// }

const menuItems: MenuItem[] = [
  { title: 'User Profile', value: 'profile' },
  { title: 'FAQs', value: 'faq' },
  { title: 'Privacy Policy', value: 'privacy' },
  { title: 'Terms & Conditions', value: 'T&C' },
  { title: 'Logout', value: 'logout' },
]

interface Company {
  name: string
}

export interface Signatory {
  name: string
  email: string
  mobile: string
  emiratesID: string
  location: string
  registeredAddress: string
}

interface MenuItem {
  title: string
  value: string
}
