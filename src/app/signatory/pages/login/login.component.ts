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
    this.auth.isAuthenticated$.subscribe(isAuthenticated =>
      // isAuthenticated ? this.router.navigate(['/insurer/profile']) : false,
      isAuthenticated ? this.router.navigate(['/back-office']) : false,
    )
    this.auth.getAccessTokenSilently({}).subscribe(token => console.log(token))
  }

  login() {
    this.auth.loginWithRedirect()
  }
}
