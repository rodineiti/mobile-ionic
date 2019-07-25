import { BillpayPage } from './../pages/billpay/billpay';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { WelcomePage } from './../pages/welcome/welcome';
import { LoginPage } from './../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { CategoryPage } from '../pages/category/category';
import { BillreceivePage } from '../pages/billreceive/billreceive';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { CategoriesServiceProvider } from '../providers/categories-service/categories-service';
import { BillpaysProvider } from '../providers/billpays/billpays';
import { BillreceivesProvider } from '../providers/billreceives/billreceives';
import { ChartModule } from 'angular-highcharts';
import { ReportProvider } from '../providers/report/report';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    WelcomePage,
    CategoryPage,
    BillreceivePage,
    BillpayPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp), HttpModule, ChartModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    WelcomePage,
    CategoryPage,
    BillreceivePage,
    BillpayPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    CategoriesServiceProvider,
    BillpaysProvider,
    BillreceivesProvider,
    ReportProvider
  ]
})
export class AppModule { }
