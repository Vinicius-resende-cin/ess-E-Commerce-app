import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthSummaryComponent } from 'src/app/components/month-summary/month-summary.component';
import { GeneralMainPageComponent } from 'src/app/components/general-main-page/general-main-page.component';
import { MainPageComponent } from 'src/app/components/main-page/main-page.component';
import { authGuard } from '../../common/auth.guard';
import { CategoryCreationComponent } from 'src/app/components/category-creation/category-creation.component';
import { ViewHistoryComponent } from 'src/app/components/view-history/view-history.component';
import { ProductDetailComponent } from 'src/app/components/product-detail/product-detail.component';
import { CategoryListComponent } from 'src/app/components/category-list/category-list.component';
import { CategoryUpdateComponent } from 'src/app/components/category-update/category-update.component';
import { RegisterItemComponent } from 'src/app/components/register-item/register-item-component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: GeneralMainPageComponent },
      { path: 'resumo-mensal', component: MonthSummaryComponent },
      { path: 'categoria', component: CategoryListComponent },
      { path: 'criacao-nova-categoria', component: CategoryCreationComponent },
      { path: 'categoria/:id', component: CategoryUpdateComponent },
      { path: 'historico-pedidos', component: ViewHistoryComponent },
      { path: 'item/:id', component: ProductDetailComponent },
      { path: 'item', component: RegisterItemComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingRoutingModule {}
