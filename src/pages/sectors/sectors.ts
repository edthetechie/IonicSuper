import { Component } from '@angular/core';
import { IonicPage, ModalController, LoadingController, NavController, ToastController, MenuController, ViewController   } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

import { FirstRunPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-sectors',
  templateUrl: 'sectors.html'
})
export class SectorsPage {

  sectors: Item[] = [];
  private currentItems: ArrayBuffer;
  loading: any;

  constructor(
    public navCtrl: NavController, 
    public items: Items, 
    public modalCtrl: ModalController, 
    public menuctrl: MenuController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public loadingController: LoadingController

  ) {
    this.loading = this.loadingController.create();
    this.menuctrl.swipeEnable(true, 'left');
    //this.sources = this.items.query();


  }

  onPageWillEnter(){
    this.refreshTheServerData();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    this.refreshTheServerData();
  }

    ionViewWillEnter() {
      this.viewCtrl.showBackButton(false);
      
    }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item, itemtitle: Item) {
    //console.log(itemtitle);
    this.navCtrl.push('SectorsDetailPage', {
      item: item,
      itemtitle: itemtitle
    });
  }

  refreshTheServerData() {
    this.loading.present();
    this.items.sectorsquery().subscribe((resp) => {
      this.currentItems = resp;
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      if (err.statusText == 'Not Authenticated - No Device Token') {
        this.navCtrl.push(FirstRunPage);
      }
    });    
  }

}

