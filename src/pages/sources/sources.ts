import { Component } from '@angular/core';
import { IonicPage, ModalController, LoadingController, NavController, ToastController, MenuController, ViewController   } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

import { FirstRunPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-sources',
  templateUrl: 'sources.html'
})
export class ListMasterPage {

  sources: Item[] = [];
  private currentItems: ArrayBuffer;
  loadingsources: any;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController, 
    public items: Items, 
    public modalCtrl: ModalController, 
    public menuctrl: MenuController,
    public toastCtrl: ToastController,
    public loadingController: LoadingController

  ) {
    
    this.menuctrl.swipeEnable(true, 'left');
    //this.sources = this.items.query();
  }


  onPageWillEnter(){
    this.refreshTheServerData();
  }


  ionViewDidLoad() {
    
  }


  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }


  openItem(item: Item, itemtitle: Item) {
    //console.log(itemtitle);
    this.navCtrl.push('ItemDetailPage', {
      item: item,
      itemtitle: itemtitle
    });
  }


  refreshTheServerData() {
    this.loadingsources = this.loadingController.create();
    this.loadingsources.present();
    this.items.sourcesquery().subscribe((resp) => {
      this.currentItems = resp;
      this.loadingsources.dismiss();
    }, (err) => {
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: err.statusText,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.loadingsources.dismiss();
      if (err.statusText == 'Not Authenticated - No Device Token') {
        this.navCtrl.push(FirstRunPage);
      }
    });    
  }


  ionViewWillEnter() {
    this.refreshTheServerData();
    this.viewCtrl.showBackButton(false);
  }
}

