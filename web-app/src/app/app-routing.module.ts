import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MonthSummaryComponent } from './components/month-summary/month-summary.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'resumo-mensal', component: MonthSummaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
