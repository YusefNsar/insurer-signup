import { provideToastr } from 'ngx-toastr'
import { provideAnimations } from '@angular/platform-browser/animations'
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http'
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular'
import { config } from './shared/config'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    provideAnimations(),
    provideToastr(),
    importProvidersFrom([
      AuthModule.forRoot({
        domain: config.auth0Domain,
        clientId: config.auth0ClientId,
        authorizationParams: {
          audience: config.audience,
          redirect_uri: window.location.origin,
        },
        httpInterceptor: {
          allowedList: [
            { uri: `${config.signatoryApi}/*` },
            { uri: `${config.signatoryApi}` },
          ],
        },
      }),
    ]),
  ],
}
