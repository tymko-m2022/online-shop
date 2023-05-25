import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';

const routes: Routes = [
  {path: '', component: LayoutComponent, children:
    [
      {path: '', component: HomePageComponent},
      {path: 'about', component: NavbarComponent}
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
