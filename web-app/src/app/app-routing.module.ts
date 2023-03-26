import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MonthSummaryComponent } from './components/month-summary/month-summary.component';
import { LoginComponent } from './components/login/login.component';
import { RecoverPassword } from './components/recover-password/recover-password.component';
import { ResetPassword } from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'resumo-mensal', component: MonthSummaryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-senha', component: RecoverPassword },
  { path: 'redefinir-senha', component: ResetPassword },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
