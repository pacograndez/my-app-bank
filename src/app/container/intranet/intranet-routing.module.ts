import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IntranetComponent} from './intranet.component';

const routes: Routes = [
  {
    path:'',
    component: IntranetComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () => import('../../intranet/profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../../intranet/account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: 'transfer',
        loadChildren: () => import('../../intranet/transfer/transfer.module').then(m => m.TransferPageModule)
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntranetRoutingModule { }
