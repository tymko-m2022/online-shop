import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule } from '@angular/forms';
import { LotComponent } from './components/lot/lot.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { NavbarAdminComponent } from './admin/components/shared/navbar/navbar.component';
import { FooterAdminComponent } from './admin/components/shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './components/home-page/filter.pipe';
import { CartItemComponent } from './components/shopping/cart-item/cart-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    LotComponent,
    ShoppingComponent,
    AdminComponent,
    NavbarAdminComponent,
    FooterAdminComponent,
    DashboardComponent,
    FilterPipe,
    CartItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
