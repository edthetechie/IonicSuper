import { Component } from '@angular/core';
import { IonicPage, ModalController, LoadingController, NavController, ToastController, MenuController, ViewController   } from 'ionic-angular';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

import { FirstRunPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-challenges',
  templateUrl: 'challenges.html'
})
export class ChallengesList {

  sources: Item[] = [];
  private currentItems: any;
  private filteredItems: any;
  loading: any;
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;

  constructor(
    public navCtrl: NavController, 
    public viewCtrl: ViewController,
    public items: Items, 
    public modalCtrl: ModalController, 
    public menuctrl: MenuController,
    public toastCtrl: ToastController,
    public loadingController: LoadingController
  ) {
    this.searchControl = new FormControl();
    this.menuctrl.swipeEnable(true, 'left');
  }


  onPageWillEnter(){
    this.refreshTheServerData();
  }

  ionViewDidLoad() {
    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
        this.searching = false;
        this.setFilteredItems();
    });
  }


  openItem(item: Item, itemtitle: Item) {
    //console.log(itemtitle);
    this.navCtrl.push('ChallengeDetailPage', {
      item: item,
      itemtitle: itemtitle
    });
  }

    ionViewWillEnter() {
      this.viewCtrl.showBackButton(false);
      this.refreshTheServerData();
    }

    setFilteredItems() {
      if (this.searchTerm == '') {
        this.filteredItems = this.currentItems;
      }
      else {
        this.filteredItems = this.filterItems(this.searchTerm);
      }
    }

    filterItems(searchTerm){
      this.filteredItems = this.currentItems;
      return this.filteredItems.filter((item) => {
          return item.TITLE.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });    
    }

    onSearchInput(){
      this.searching = true;
    }


    refreshTheServerData() {
      this.loading = this.loadingController.create();
      this.loading.present();
      this.items.challengesquery().subscribe((resp) => {
        this.currentItems = resp;
        this.filteredItems = this.currentItems;
        this.loading.dismiss();
      }, (err) => {

        this.loading.dismiss();
        if (err.statusText == 'Not Authenticated - No Device Token') {
          this.navCtrl.push(FirstRunPage);
        }
      });      
    }

}
