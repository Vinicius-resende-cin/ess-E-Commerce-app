import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardLogin, authGuardMain } from 'src/app/common/auth.guard';
import { GeneralMainPageComponent } from 'src/app/components/general-main-page/general-main-page.component';
import { MainMenuComponent } from 'src/app/components/main-menu/main-menu.component';
import { ProductDetailComponent } from 'src/app/components/product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent,
    canActivate: [authGuardLogin],
    children: [
      { path: '', component: GeneralMainPageComponent },
      { path: 'item/:id', component: ProductDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainMenuRoutingRoutingModule {}
