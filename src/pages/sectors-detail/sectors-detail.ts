import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, ModalController, MenuController, ViewController } from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { Items } from '../../providers/providers';

import { FirstRunPage, SectorsPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-sectors-detail',
  templateUrl: 'sectors-detail.html'
})
export class SectorsDetailPage {

  item: any;
  itemtitle: any;
  pagetitle: any;
  itemurl: any;
  loadingexport: any;
  private loginErrorString: string;
  private currentItems: any;
  private filteredItems: any;
  loading: any;
  exportAlertMessage: any;
  exportresponse: any;
  sectorid: any;
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public items: Items, 
    public toastCtrl: ToastController, 
    public browserTab: BrowserTab,
    public loadingController: LoadingController,
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController,
    public menuctrl: MenuController,        
    public alertCtrl: AlertController
  ) {

    this.searchControl = new FormControl();
    this.menuctrl.swipeEnable(true, 'left');
  
  }

    onPageWillEnter(){
      this.refreshTheServerData();
    }

    ionViewDidLoad() {
      this.setFilteredItems();
      if (!this.navParams.get('item')) {
        this.navCtrl.push(SectorsPage);
      }
      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
          this.searching = false;
          this.setFilteredItems();
      });
    }

    openUrl(itemurl) {
        window.open(itemurl);// open URL with InAppBrowser instead or SafariViewController
    }

    ionViewWillEnter() {
      this.viewCtrl.showBackButton(true);
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

    showSummary(summarytype){
      this.item = this.navParams.get('item');
      let summaryModal = this.modalCtrl.create('SummaryPage', { summarytype: summarytype, sectorid: this.item });
      summaryModal.present();
    }  


    doExport(sectorid){
      this.loadingexport = this.loadingController.create();
      //this.sources = this.items.query();
      this.loadingexport.present();
      this.items.sectorsexportquery(sectorid).subscribe((resp) => {
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
        this.loadingexport.dismiss();
      }, (err) => {
        // Unable to log in
        let toast = this.toastCtrl.create({
          message: err.statusText,
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.loadingexport.dismiss();
        if (err.statusText == 'Not Authenticated - No Device Token') {
          this.navCtrl.push(FirstRunPage);
        }   
      });  
    } 

    refreshTheServerData() {
      this.loading = this.loadingController.create();
      this.loading.present();
      this.item = this.navParams.get('item');
      this.itemtitle = this.navParams.get('itemtitle') || 'No sector name found!';
      this.items.sectorsdetailquery(this.item).subscribe((resp) => {
        this.currentItems = resp;
        this.filteredItems = this.currentItems;
        this.pagetitle = this.itemtitle;
        this.sectorid = this.item;
        this.loading.dismiss();
        // console.log(this.pagetitle);
      }, (err) => {
        // Unable to log in
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.loading.dismiss();
      });   

    }

}
