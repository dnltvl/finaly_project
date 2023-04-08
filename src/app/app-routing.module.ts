import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCompComponent } from './main-comp/main-comp.component';
import { Category1CompComponent } from './category1-comp/category1-comp.component';
import { Category2CompComponent } from './category2-comp/category2-comp.component';
import { Product1CompComponent } from './product1-comp/product1-comp.component';
import { ContactCompComponent } from './contact-comp/contact-comp.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UseregFormComponent } from './usereg-form/usereg-form.component';
import { FinaleComponent } from './finale/finale.component';

const routes: Routes = [
  {
    path:'',
    component: MainCompComponent
  },
  {
    path:'Category1',
    component: Category1CompComponent
  },
  {
    path:'Category2',
    component: Category2CompComponent
  },
  {
    path:'Contact',
    component: ContactCompComponent
  },
  {
    path:'User',
    component: UserFormComponent
  },
  {
    path:'UserReg',
    component: UseregFormComponent
  },
  {
    path:'Product1/:prodId',
    component: Product1CompComponent
  },
  {
    path:'Finale/:prodId/:result_t/:count_t',
    component: FinaleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
