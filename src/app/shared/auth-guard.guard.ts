import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular'
import { map } from 'rxjs'

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.user$.pipe(
    map(user => {
      console.log('wtf')
      //* admin users' sub id will begin with 'waad'
      if (user && user.sub?.split('|')[0] === 'waad') {
        return router.createUrlTree(['/back-office'])
      }

      if (user) {
        return router.createUrlTree(['/insurer/profile'])
      }

      return router.createUrlTree(['/insurer/login'])
    }),
  )
}
