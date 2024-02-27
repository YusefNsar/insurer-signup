import { Routes } from '@angular/router'
import { AuthGuard } from './shared/auth-guard.guard'

const backOfficeModule = () =>
  import('./back-office/back-office.module').then(
    ({ BackOfficeModule }) => BackOfficeModule,
  )
const signatoryModule = () =>
  import('./signatory/signatory.module').then(
    ({ SignatoryModule }) => SignatoryModule,
  )

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/insurer',
    pathMatch: 'full',
  },
  { path: 'insurer', loadChildren: signatoryModule },
  {
    path: 'back-office',
    loadChildren: backOfficeModule,
    // canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/insurer' },
]
