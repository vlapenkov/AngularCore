import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { DriverslistComponent } from './driverslist/driverslist.component';
import { DriverslistitemComponent } from './driverlistitem/driverslistitem.component'; 

import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2PaginationModule } from 'ng2-pagination'; //importing ng2-pagination
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
//import { HeroService } from './services/hero.service';
import { DriverService } from './services/driver.service';
import { SingletonService } from './services/singleton.service';
import { AuthenticationService } from './services/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,

  MatCheckboxModule,

  MatDatepickerModule,
  MatDialogModule,

  MatInputModule,
  MatListModule,

  MatPaginatorModule,

  MatRadioModule,

  MatSelectModule,

} from '@angular/material';




import { EmitterService } from './services/emitterservice';
import { DriverformComponent } from './driver-form/driver-form.component';
import { LoginComponent } from './login/login.component';
import { DriverRouteActivator } from './services/driverroute.activator';
import { Error404Component } from './error404/error404.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { SomeOtherModule } from './some-other/some-other.module';
import { SampleComponent } from './sample/sample.component';

@NgModule({
// то что принадлежит этому модулю
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
  //  CounterComponent - принадлежит другому модулю,
    FetchDataComponent,
    DriverslistComponent,
    DriverslistitemComponent,
    DriverformComponent,
    LoginComponent,
    Error404Component,
    SampleComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
   Ng2SearchPipeModule, 
    Ng2OrderModule,      
    Ng2PaginationModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule, 
    MatRadioModule, 
    MatSelectModule, 
   SomeOtherModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent }, 
      { path: 'fetch-data', component: FetchDataComponent },     
      { path: 'drivers', component: DriverslistComponent },
      { path: 'drivers/:id', component: DriverformComponent,  canActivate: [DriverRouteActivator] },
      { path: 'login', component: LoginComponent },
      { path: '**', component: Error404Component }, 
    ])
  ],
  providers: [DriverService, AuthenticationService, DriverRouteActivator, SingletonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi:true

    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
