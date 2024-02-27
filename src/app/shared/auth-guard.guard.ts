import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot  } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.authService.user$.pipe(

      map((user) => {
       
        // Check if the user is an admin (sub id begins with 'waad')
        if (user && user.sub?.split('|')[0] === 'waad') {
         
          return this.router.createUrlTree(['/back-office']);
        }

        // Check if the user is authenticated
        else if (user) {
          if (route.routeConfig?.path === 'profile') {
            return true; // Allow access to the 'profile' route without redirection
          }
          return this.router.createUrlTree(['/insurer/profile']);

        }
        // Redirect to the default route if not authenticated
        else {
          return this.router.createUrlTree(['/insurer/login']);
        }
      })
    );
  }
}
