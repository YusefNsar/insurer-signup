import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular'
import { map } from 'rxjs'

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.isAuthenticated$.pipe(
    map(isAuthenticated =>
      isAuthenticated ? true : router.createUrlTree(['/insurer/login']),
    ),
  )
}
