import { inject } from '@angular/core'
import { CanActivateFn } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular'
import { map } from 'rxjs/operators'

export const AdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)

  return authService.user$.pipe(
    map(user => {
      //* admin users' sub id will begin with 'waad'
      return !!user && user.sub?.split('|')[0] === 'waad'
    }),
  )
}
