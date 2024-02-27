import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular'
import { map } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      //* admin users' sub id will begin with 'waad'
      if (user && user.sub?.split('|')[0] === 'waad') {
        this.router.navigate(['/back-office'])
      } else if (user) {
        this.router.navigate(['/insurer/profile'])
      } else {
        this.router.navigate(['/insurer/login'])
      }
    })
    // this.auth.idTokenClaims$.subscribe(user => console.log('claims', user))
    // this.auth.user$.subscribe(user => console.log('user', user))
    // this.auth.appState$.subscribe(s => console.log('state', s))
    // this.auth.isAuthenticated$.subscribe(isAuthenticated =>
    //   isAuthenticated ? this.router.navigate(['/back-office']) : false,
    // )
    this.auth.getAccessTokenSilently({}).subscribe(token => console.log(token))
  }

  login() {
    this.auth.loginWithPopup()
  }
}
