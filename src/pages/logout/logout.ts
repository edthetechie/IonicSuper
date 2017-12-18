import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { FirstRunPage } from '../pages';

import { Storage } from '@ionic/storage';
/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(
    public navCtrl: NavController, 
    public user: User,
    public storage: Storage,
    public loadingController: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.user.logout();
    this.navCtrl.push(FirstRunPage);
  }

}
