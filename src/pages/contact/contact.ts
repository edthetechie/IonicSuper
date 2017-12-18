import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';


@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  contact: { msgsubject: string, usermessage: string } = {
    msgsubject: '',
    usermessage: ''
  };
  loading: any;
  // Our translated text strings
  private signupErrorString: string;

  constructor(
    public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public menuctrl: MenuController,
    public viewCtrl: ViewController,
    public loadingController: LoadingController,
    public alertCtrl: AlertController
  ) {

    this.menuctrl.swipeEnable(false, 'left');
    
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  sendContactForm() {
    this.loading = this.loadingController.create();
    this.loading.present();
    this.user.contactus(this.contact).subscribe((resp) => {
    console.log(resp); 
    this.loading.dismiss();
      let alert = this.alertCtrl.create({
        subTitle: 'Thank you for your feedback',
        buttons: ['OK']
      });
      alert.present();          
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.loading.dismiss();
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
