import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RecoverAccountComponent } from './components/recover-account/recover-account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { authGuardLogin } from './common/auth.guard';
import { CadastroUserComponent } from './components/cadastro-user/cadastro-user.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/main-menu-routing/main-menu-routing.module').then(
        (m) => m.MainMenuRoutingModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/main-page-routing/main-page-routing.module').then(
        (m) => m.MainPageRoutingModule
      ),
  },
  {
    path: 'Cadastro-Usuario',
    component: CadastroUserComponent,
    canActivate: [authGuardLogin],
  },
  { path: 'login', component: LoginComponent, canActivate: [authGuardLogin] },
  {
    path: 'recuperar-conta',
    component: RecoverAccountComponent,
    canActivate: [authGuardLogin],
  },
  {
    path: 'redefinir-senha',
    component: ResetPasswordComponent,
    canActivate: [authGuardLogin],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
