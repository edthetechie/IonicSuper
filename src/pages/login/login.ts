import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController, MenuController, ViewController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import { SignupPage } from '../pages';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'ed@cc.uk.com',
    password: 'plut0nia'
  };

  // Our translated text strings
  private loginErrorString: string;
  loading: any;
  _client: any;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public storage: Storage,
    public menuctrl: MenuController,
    public loadingController: LoadingController
  ) {

    this.menuctrl.swipeEnable(false, 'left');
    this.menuctrl.enable(false, 'left');

    this.loading = this.loadingController.create();
    this.storage.get("_devicetoken")
      .then(value => {
        if (value !== null) {
          this.navCtrl.push(MainPage);
        }
      });

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
    this.menuctrl.swipeEnable(false, 'left');
    this.menuctrl.enable(false, 'left');
  }

  // Attempt to login in through our User service
  doLogin() {
    this.loading.present();
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
      this.loading.dismiss();
    }, (err) => {
      this.navCtrl.push(LoginPage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      this.loading.dismiss();
      toast.present();
      
    });
  }
  // Attempt to login in through our User service
  signUp() {
    this.navCtrl.push(SignupPage);
  }  
}
