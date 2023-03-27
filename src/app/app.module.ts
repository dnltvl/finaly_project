import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuCompComponent } from './menu-comp/menu-comp.component';
import { FooterCompComponent } from './footer-comp/footer-comp.component';
import { MainCompComponent } from './main-comp/main-comp.component';
import { Category1CompComponent } from './category1-comp/category1-comp.component';
import { Category2CompComponent } from './category2-comp/category2-comp.component';
import { Product1CompComponent } from './product1-comp/product1-comp.component';
import { ContactCompComponent } from './contact-comp/contact-comp.component';
import { FinaleComponent } from './finale/finale.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UseregFormComponent } from './usereg-form/usereg-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuCompComponent,
    FooterCompComponent,
    MainCompComponent,
    Category1CompComponent,
    Category2CompComponent,
    Product1CompComponent,
    ContactCompComponent,
    FinaleComponent,
    UserFormComponent,
    UseregFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
