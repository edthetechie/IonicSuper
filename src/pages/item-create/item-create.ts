import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, ToastController, LoadingController } from 'ionic-angular';

import { SourceProvider } from '../../providers/providers';
import { SourcesPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-item-create',
  templateUrl: 'item-create.html'
})
export class ItemCreatePage {

  sourceAddError: any;
  loading: any;

  addsource: { omniSource: string, tag: string } = {
    omniSource: '@edthetechie',
    tag: 'personal'
  };

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController, 
    public toastCtrl: ToastController,
    public source: SourceProvider,
    public loadingController: LoadingController
  ) {
      this.loading = this.loadingController.create();
  }

  ionViewDidLoad() {

  }
  /**
   * The user cancelled, so we dismiss without sending data back.
   */
  cancel() {
    this.viewCtrl.dismiss();
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */
  done() {
    this.loading.present();
    this.source.add(this.addsource).subscribe((resp) => {
      //this.user.login(this.account);
      this.navCtrl.push(SourcesPage);
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      // this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.sourceAddError,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
    // console.log(this.form.controls);
    // this.navCtrl.push(SourcesPage);
  }
}
