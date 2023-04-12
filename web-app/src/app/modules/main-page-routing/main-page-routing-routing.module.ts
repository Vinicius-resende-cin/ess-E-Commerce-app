import { Component, NgModule } from '@angular/core';
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
import { PerfilUserComponent } from 'src/app/components/perfil-user/perfil-user.component';
import { AdminPainelComponent } from 'src/app/components/admin-painel/admin-painel.component';
import { CartComponent } from 'src/app/components/cart/cart.component';
import { EditItemComponent } from 'src/app/components/edit-item/edit-item.component';
import { ViewItensComponent } from 'src/app/components/view-itens/view-itens.component';
import { PasswordConfirmationComponent } from 'src/app/components/password-confirmation/password-confirmation.component';

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
      { path: 'item', component: ViewItensComponent },
      { path: 'create-item', component: RegisterItemComponent },
      { path: 'view-itens', component: ViewItensComponent },
      { path: 'view-itens/edit-item/:id', component: EditItemComponent },
      { path: 'perfil-user', component: PerfilUserComponent },
      { path: 'admin-painel', component: AdminPainelComponent },
      { path: 'cart', component: CartComponent },
      { path: 'password-confirmation/:id', component: PasswordConfirmationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingRoutingModule {}
