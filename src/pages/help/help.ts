import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ViewController } from 'ionic-angular';

import { User } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})
export class HelpPage {

	loggedin: any;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuctrl: MenuController,
    public user: User
  ) {

     this.menuctrl.swipeEnable(true, 'left');
    this.menuctrl.enable(true, 'left');

     if (typeof this.user._user == 'undefined')  {
     	this.loggedin = this.user.isLoggedIn();
     	console.log("2: " + this.loggedin);
     }

  }

  ionViewWillEnter() {
	   this.viewCtrl.showBackButton(false);
  }

}
