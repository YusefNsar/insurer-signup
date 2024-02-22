import { CanActivateFn } from '@angular/router'

export const AuthGuard: CanActivateFn = (route, state) => {
  // todo navigate to the appropriate module
  return true
}
