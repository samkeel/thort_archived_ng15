import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './shared/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'login',
    loadComponent: () =>
      import('./shared/components/login/login.component').then(
        (component) => component.LoginComponent
      ),
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./shared/components/sign-up/sign-up.component').then(
        (component) => component.SignUpComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import(
        './shared/components/page-not-found/page-not-found.component'
      ).then((component) => component.PageNotFoundComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
