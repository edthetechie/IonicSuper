import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, ViewController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { fname: string, sname: string, org: string, email: string, password: string } = {
    fname: 'Test',
    sname: 'Human',
    org: 'Test',
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private signupErrorString: string;

  constructor(
    public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public menuctrl: MenuController,
    public viewCtrl: ViewController
  ) {

    this.menuctrl.swipeEnable(false, 'left');
    
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
      //this.user.login(this.account);
      this.navCtrl.push(MainPage);
    }, (err) => {

      // this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(true);
  }
}
