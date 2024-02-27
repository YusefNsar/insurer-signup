import { inject } from '@angular/core'
import { Router, CanActivateFn } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular'
import { map } from 'rxjs/operators'

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.user$.pipe(
    map(user => {
      console.log(
        !!user,
        user?.sub?.split('|')[0] === 'waad',
        route.routeConfig?.path,
      )
      //* admin users' sub id will begin with 'waad'
      if (
        user &&
        user.sub?.split('|')[0] === 'waad' &&
        route.routeConfig?.path !== 'back-office'
      ) {
        // return router.createUrlTree(['/back-office'])
      }

      if (user && route.routeConfig?.path !== 'profile') {
        return router.createUrlTree(['/insurer/profile'])
      }

      if (!user && route.routeConfig?.path !== 'login') {
        return router.createUrlTree(['/insurer/login'])
      }

      // don't redirect
      return true
    }),
  )
}
