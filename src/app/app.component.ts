import { AuthService } from '@auth0/auth0-angular'
import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterOutlet } from '@angular/router'
import { LayoutComponent } from './shared/layout/layout.component'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LayoutComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'insurer-sign-up'
  showBackgroundEffects: boolean = true
  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      //* admin users' sub id will begin with 'waad'
      if (user && user.sub?.split('|')[0] === 'waad') {
        this.router.navigate(['/back-office'])
      } else if (user) {
        this.router.navigate(['/insurer/profile'])
      }
    })

    this.auth.error$.subscribe(err => console.error(err))
  }
}
