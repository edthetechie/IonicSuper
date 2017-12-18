import { Component } from '@angular/core';
import { IonicPage, ModalController, LoadingController, NavController, ToastController, MenuController, ViewController, AlertController } from 'ionic-angular';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';

import { FirstRunPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-indicators',
  templateUrl: 'indicators.html',
})
export class IndicatorsPage {

  sources: Item[] = [];
  private currentItems: any;
  private filteredItems: any;
  loading: any;
  exportresponse: any;
  exportAlertMessage: any;
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
    public loadingController: LoadingController,
    public alertCtrl: AlertController
  ) {
      this.searchControl = new FormControl();
      this.menuctrl.swipeEnable(true, 'left');
  }


  onPageWillEnter(){
    this.refreshTheServerData();
  }


  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
    this.refreshTheServerData();
  }


  ionViewDidLoad() {
    this.setFilteredItems();
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });
  }


  openItem(url) {
    window.open(url);
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
    console.log(this.searching);
  }  


  showSummary(summarytype){
    let summaryModal = this.modalCtrl.create('SummaryPage', { summarytype: summarytype });
    summaryModal.present();
  }  


  doExport(){
    this.loading = this.loadingController.create();
    //this.sources = this.items.query();
    this.loading.present();
    this.items.indicatorsexportquery().subscribe((resp) => {
      this.exportresponse = resp;
      if (this.exportresponse.SUCCESS) {
        this.exportAlertMessage = 'The export was created and emailed to ' + this.exportresponse.SENTTOEMAIL;
      }
      else {
        this.exportAlertMessage = 'There was a problem creating the export';
      }
      let alert = this.alertCtrl.create({
        subTitle: this.exportAlertMessage,
        buttons: ['OK']
      });
      alert.present();    
      this.loading.dismiss();
    }, (err) => {
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: err.statusText,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.loading.dismiss();
      if (err.statusText == 'Not Authenticated - No Device Token') {
        this.navCtrl.push(FirstRunPage);
      }   
    });  
  }    


  refreshTheServerData() {
    this.loading = this.loadingController.create();
    //this.sources = this.items.query();
    this.loading.present();
    this.items.indicatorsquery().subscribe((resp) => {
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
