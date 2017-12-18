import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, ViewController, LoadingController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { Items } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  search: { q: string } = {
    q: ''
  };
  loading: any;
  // Our translated text strings
  private signupErrorString: string;
  private currentItems: any;

  constructor(
    public navCtrl: NavController,
    public items: Items,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public menuctrl: MenuController,
    public viewCtrl: ViewController,
    public loadingController: LoadingController,
  ) {

    this.menuctrl.swipeEnable(false, 'left');
    
    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
  }

  openItem(url) {
    window.open(url);
  }

  doSearch() {
    this.loading = this.loadingController.create();
    this.loading.present();
    // Attempt to login in through our User service
    this.items.searchquery(this.search).subscribe((resp) => {
      //this.user.login(this.account);
      //console.log(resp);
      this.currentItems = resp;
      this.loading.dismiss();
    }, (err) => {

      // this.navCtrl.push(MainPage);
       this.loading.dismiss();
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
    this.viewCtrl.showBackButton(false);
  }
}
