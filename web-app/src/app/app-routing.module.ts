import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MonthSummaryComponent } from './components/month-summary/month-summary.component';
import { CategoryCreationComponent } from './components/category-creation/category-creation.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'resumo-mensal', component: MonthSummaryComponent },
  { path: 'categoria', component: CategoryCreationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
