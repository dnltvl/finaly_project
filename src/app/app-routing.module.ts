import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsManageFormComponent } from './settings-manage-form/settings-manage-form.component';
import { MainCompComponent } from './main-comp/main-comp.component';
import { CategoryCompComponent } from './category-comp/category-comp.component';
import { ProductCompComponent } from './product-comp/product-comp.component';
import { FinaleComponent } from './finale/finale.component';
import { ContactCompComponent } from './contact-comp/contact-comp.component';
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

const routes: Routes = [
  {
    path:'',
    component: MainCompComponent
  },
  {
  path: 'SettingsManage',
  component: SettingsManageFormComponent
  },
  {
    path:'Category/:id',
    component: CategoryCompComponent
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
    path:'UserManage',
    component: UserManageFormComponent
  },
{
    path:'UserUpdate/:userId',
    component: UserUpdateFormComponent
  },
  {
  path:'Product/:itemType/:prodId',
  component: ProductCompComponent
  },
{
  path:'Finale/:userId',
  component: FinaleComponent
},
{
  path:'PayManage/:userId',
  component: PayManageFormComponent
},
{
  path:'ItemManage/:itemType',
  component: ItemManageFormComponent
},
{
  path:'ItemUpdate/:itemType/:itemId',
  component: ItemUpdateFormComponent
},
  {
    path:'ItemReg',
    component: ItemRegFormComponent
  },
  {
    path:'BascetManage/:userId',
    component: BascetManageFormComponent
  },
  {
    path:'BascetItem/:userId',
    component: BascetItemUpdComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
