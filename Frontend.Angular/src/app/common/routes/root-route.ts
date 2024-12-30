import {Routes} from '@angular/router';
import {TextHost} from '../lang-system/TextHost';

import {routes} from './routes';
import {canActivateLang} from "@common/routes/can-activate-lang";

export const rootRoute: Routes = [
  {
    // matcher: checkLang,
    path: ':lang',
    loadComponent: () => import('./root-path.component').then(m => m.RootPathComponent),
    children: routes,
    canActivate: [canActivateLang],
    // canActivateChild: [canActivateChild]
  },
  {path: '**', redirectTo: `${TextHost.DefaultLanguage}`, pathMatch: 'full'},
]

