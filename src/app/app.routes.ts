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
  { path: '', redirectTo: '/registered-forms', pathMatch: 'full' },
  { path: 'insurer', loadChildren: signatoryModule },
  { path: 'back-office', loadChildren: backOfficeModule },
  { path: '**', redirectTo: '/insurer' },
]
