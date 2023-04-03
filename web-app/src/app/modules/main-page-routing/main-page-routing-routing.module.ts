import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthSummaryComponent } from 'src/app/components/month-summary/month-summary.component';
import { GeneralMainPageComponent } from 'src/app/components/general-main-page/general-main-page.component';
import { MainPageComponent } from 'src/app/components/main-page/main-page.component';
import { authGuard } from '../../common/auth.guard';
import { CategoryCreationComponent } from 'src/app/components/category-creation/category-creation.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: GeneralMainPageComponent },
      { path: 'resumo-mensal', component: MonthSummaryComponent },
      { path: 'categoria', component: CategoryCreationComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingRoutingModule {}
