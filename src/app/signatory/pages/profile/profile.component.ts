import { Component } from '@angular/core'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  profile: Profile = {
    company: {
      name: 'AXA Insurance (Gulf) B.S.C. (C)',
    },
    signatory: {
      email: 'Axa@uae.com',
      emiratesID: '12334',
      location: 'Dubai',
      mobile: '244523',
      name: 'Ahmed Amr',
      registeredAddress: 'Dubai, mirdif',
    },
  }

  activeItem: string = 'profile'

  setActiveItem = (newActive: string) => {
    this.activeItem = newActive
  }

  menuItems: MenuItem[] = [
    { title: 'User Profile', value: 'profile' },
    { title: 'Change Password', value: 'password' },
    { title: 'FAQs', value: 'faq' },
    { title: 'Privacy Policy', value: 'privacy' },
    { title: 'Terms & Conditions', value: 'T&C' },
    { title: 'Logout', value: 'logout' },
  ]
}

interface Profile {
  company: Company
  signatory: Signatory
}

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
