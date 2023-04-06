import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardMain } from 'src/app/common/auth.guard';
import { GeneralMainPageComponent } from 'src/app/components/general-main-page/general-main-page.component';
import { MainMenuComponent } from 'src/app/components/main-menu/main-menu.component';

const routes: Routes = [
  {
    path: '',
    component: MainMenuComponent,
    canActivate: [authGuardMain],
    children: [{ path: '', component: GeneralMainPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainMenuRoutingRoutingModule {}
