import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage } from '../pages/pages';
import { User } from '../providers/providers';

import { Storage } from '@ionic/storage';

@Component({
  template: `<ion-split-pane><ion-menu [content]="content" persistent="true">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title class="st-title">{{_clientname}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item *ngFor="let p of pages" (click)="openPage(p)" menuClose class="nav-menu">
          <ion-icon ios="{{p.icon}}" md="{{p.iconmd}}" color="primary" item-start></ion-icon>
            {{p.title}}
          </ion-item>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content main [root]="rootPage"></ion-nav></ion-split-pane>`
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;
  _clientname: any;

  pages: any[] = [
    { title: 'Home', component: 'HomePage', icon: 'ios-home', iconmd: 'md-home' },
    { title: 'My Sources', component: 'ListMasterPage', icon: 'ios-add-circle', iconmd: 'md-add-circle'  },
    { title: 'Search', component: 'SearchPage', icon: 'ios-search', iconmd: 'md-search' },
    { title: 'Challenges', component: 'ChallengesList', icon: 'ios-flame', iconmd: 'md-flame'  },
    { title: 'My Forecasts', component: 'IndicatorsPage', icon: 'ios-star', iconmd: 'md-star'  },    
    { title: 'View by Tag', component: 'TagsPage', icon: 'ios-pricetag', iconmd: 'md-pricetag'  },
    { title: 'View by Sector', component: 'SectorsPage', icon: 'ios-glasses', iconmd: 'md-glasses'  },
    { title: 'Help', component: 'HelpPage', icon: 'ios-help-circle', iconmd: 'md-help-circle'  },
    { title: 'Contact Us', component: 'ContactPage', icon: 'ios-mail', iconmd: 'md-mail'  },
    { title: 'Logout', component: 'LogoutPage', icon: 'md-log-out', iconmd: 'md-log-out'  }
  ];

  constructor(
    private translate: TranslateService, 
    platform: Platform, 
    private config: Config, 
    private statusBar: StatusBar, 
    public storage: Storage,
    public user: User,
    private splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
    this.storage.get("_clientname").then(data => {
      this._clientname = data;
    });;
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
