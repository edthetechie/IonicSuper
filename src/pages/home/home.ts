import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ViewController } from 'ionic-angular';

import { User } from '../../providers/providers';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  _clientname: any;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public menuctrl: MenuController,
    public user: User
  ) {

     this.menuctrl.swipeEnable(true, 'left');
     this.menuctrl.enable(true, 'left');

  }

  ionViewWillEnter() {
	   this.viewCtrl.showBackButton(false);
     this.storage.get("_clientname").then(data => {
      this._clientname = data;
      // console.log("Client name: " + this._clientname);
    });;
     
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page);
  }

}
