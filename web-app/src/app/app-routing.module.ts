import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralMainPageComponent } from './components/general-main-page/general-main-page.component';
import { LoginComponent } from './components/login/login.component';
import { RecoverPassword } from './components/recover-password/recover-password.component';
import { ResetPassword } from './components/reset-password/reset-password.component';
import { CategoryCreationComponent } from './components/category-creation/category-creation.component';

const routes: Routes = [
  { path: '', component: GeneralMainPageComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/main-page-routing/main-page-routing.module').then(
        (m) => m.MainPageRoutingModule
      ),
  },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-senha', component: RecoverPassword },
  { path: 'redefinir-senha', component: ResetPassword },
  { path: 'categoria', component: CategoryCreationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
