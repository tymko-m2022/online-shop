import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LotComponent } from './components/lot/lot.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: LayoutComponent, children:
    [
      {path: '', component: HomePageComponent},
      {path: 'products/:slug', component: LotComponent},
      {path: 'cart', component: ShoppingComponent}
    ] 
  },
  {path: '', component: AdminComponent, children: 
    [
      {path: 'admin', component: DashboardComponent}
    ]
  },
  {path: "404", component: NotFoundComponent},
  {path: "**", redirectTo: "404"}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
