import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ListRenderComponent } from './components/list-render/list-render.component';
import { MonthSummaryComponent } from './components/month-summary/month-summary.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CategoryCreationComponent } from './components/category-creation/category-creation.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { AlertComponent } from './components/alert/alert.component';
import { GeneralMainPageComponent } from './components/general-main-page/general-main-page.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ViewHistoryComponent } from './components/view-history/view-history.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CadastroUserComponent } from './components/cadastro-user/cadastro-user.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';
import { RegisterItemComponent } from './components/register-item/register-item-component';

import ptBr from '@angular/common/locales/pt';
import { PerfilUserComponent } from './components/perfil-user/perfil-user.component';
import { AdminPainelComponent } from './components/admin-painel/admin-painel.component';
import { ViewItensComponent } from './components/view-itens/view-itens.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    ListRenderComponent,
    MonthSummaryComponent,
    LoginComponent,
    CategoryCreationComponent,
    CategoryListComponent,
    MainPageComponent,
    AlertComponent,
    GeneralMainPageComponent,
    MainMenuComponent,
    ViewHistoryComponent,
    ProductDetailComponent,
    CadastroUserComponent,
    CategoryUpdateComponent,
    RegisterItemComponent,
    PerfilUserComponent,
    AdminPainelComponent,
    ViewItensComponent,
    EditItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
