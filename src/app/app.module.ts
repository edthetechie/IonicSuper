/*
  TODO: Add contact form and functionality
  TODO: Add top nav search box and move page titles
  TODO: Add filtering to the other modules in the app
  TODO: Figure out how to do the nav title per logged in clients
  TODO: Change the design to make it look like the current app
  TODO: Clear out unused code from the app and change the folder and app name
  TODO: Figure out how to build and deploy to phonegap
  TODO: Add the tabs to the bottom of forecast listing pages for summary and export
*/

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';

import { Items } from '../providers/queries/queries';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';
import { SourceProvider } from '../providers/source/source';


// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    Items,
    SourceProvider,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    BrowserTab,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SourceProvider
  ]
})
export class AppModule {

 }
