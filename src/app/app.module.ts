import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterCompComponent } from './footer-comp/footer-comp.component';
import { MainCompComponent } from './main-comp/main-comp.component';
import { CategoryCompComponent } from './category-comp/category-comp.component';
import { ProductCompComponent } from './product-comp/product-comp.component';
import { ContactCompComponent } from './contact-comp/contact-comp.component';
import { FinaleComponent } from './finale/finale.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UseregFormComponent } from './user-reg-form/user-reg-form.component';
import { UserManageFormComponent } from './user-manage-form/user-manage-form.component';
import { UserUpdateFormComponent } from './user-update-form/user-update-form.component';
import { ItemManageFormComponent } from './item-manage-form/item-manage-form.component';
import { ItemUpdateFormComponent } from './item-update-form/item-update-form.component';
import { ItemRegFormComponent } from './item-reg-form/item-reg-form.component';
import { BascetManageFormComponent } from './bascet-manage-form/bascet-manage-form.component';
import { BascetItemUpdComponent } from './bascet-item-upd-form/bascet-item-upd-form.component';
import { PayManageFormComponent } from './pay-manage-form/pay-manage-form.component';
import { SettingsManageFormComponent } from './settings-manage-form/settings-manage-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterCompComponent,
    MainCompComponent,
    CategoryCompComponent,
    ProductCompComponent,
    ContactCompComponent,
    FinaleComponent,
    UserFormComponent,
    UseregFormComponent,
    UserManageFormComponent,
    UserUpdateFormComponent,
    ItemUpdateFormComponent,
    ItemRegFormComponent,
    ItemManageFormComponent,
    BascetManageFormComponent,
    BascetItemUpdComponent,
    PayManageFormComponent,
    SettingsManageFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
