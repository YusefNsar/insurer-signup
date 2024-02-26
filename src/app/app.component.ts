import { AuthService } from '@auth0/auth0-angular'
import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'
import { LayoutComponent } from './shared/layout/layout.component'
import { HttpClient } from '@angular/common/http'
import { config } from './shared/config'

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
  showBackgroundEffects: boolean = true;
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.auth.error$.subscribe(err => console.error(err))
    this.auth.isAuthenticated$.subscribe(status => {
      if (status) {
        this.http.get(`${config.signatoryApi}/`).subscribe(reply => {
          console.log(reply)
        })
      }
    })
  }
}
