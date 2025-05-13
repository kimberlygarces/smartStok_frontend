import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { AlertsListComponent } from './demo/alerts/alerts-list/alerts-list.component';
import RegisterComponent from './demo/pages/authentication/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () => import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component')
      },
      {
        path: 'Alert',
        loadComponent: () => import('./demo/alerts/alerts-register/alerts-register.component').then((c) => c.AlertsRegisterComponent)
      },{
        path: 'Alert_List',
        loadComponent: () => import('./demo/alerts/alerts-list/alerts-list.component').then((c) => c.AlertsListComponent)
      },  
      {
        path: 'RegisterUser',
      loadComponent: () => import('./demo/register-user/register-user.component').then((c) => c.RegisterUserComponent)
      },  
      {
        path: 'Config_IA',
        loadComponent: () => import('./demo/config_IA/config-ia/config-ia.component').then((c) => c.ConfigIaComponent)
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'guest',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],  // <-- Esta debe ser la única importación
  exports: [RouterModule]
})
export class AppRoutingModule { }
