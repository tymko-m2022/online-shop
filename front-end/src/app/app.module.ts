import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {Routes, RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { LotComponent } from './lot/lot.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes =[
  { path: '', component: MainComponent},
  { path: 'lot', component: LotComponent},
  { path: 'shop', component: ShoppingComponent},
  { path: 'admin', component: AdminComponent},
  { path: '**', component: MainComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    MainComponent,
    LotComponent,
    ShoppingComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
