import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ModalController, AlertController, MenuController, ViewController } from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { Items } from '../../providers/providers';
import { FirstRunPage } from '../pages';
import { TagsPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-tags-detail',
  templateUrl: 'tags-detail.html'
})
export class TagsDetailPage {

  item: any;
  itemtitle: any;
  pagetitle: any;
  itemurl: any;
  private loginErrorString: string;
  private currentItems: any;
  private filteredItems: any;  
  loading: any;
  loadingexport: any;
  exportAlertMessage: any;
  exportresponse: any;
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public items: Items, 
    public toastCtrl: ToastController, 
    public browserTab: BrowserTab,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public menuctrl: MenuController,    
    public loadingController: LoadingController,
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
        this.navCtrl.push(TagsPage);
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
      // console.log(summarytype);
      let summaryModal = this.modalCtrl.create('SummaryPage', { summarytype: summarytype, tagname: this.item });
      summaryModal.present();
    }  


    doExport(tag){
      this.loadingexport = this.loadingController.create({
        content: 'Loading...'
      });
      //this.sources = this.items.query();
      this.loadingexport.present();
      this.items.tagsexportquery(tag).subscribe((resp) => {
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
      this.itemtitle = this.navParams.get('itemtitle') || 'No tag found!';
      this.items.tagsdetailquery(this.item).subscribe((resp) => {
        this.currentItems = resp;
        this.filteredItems = this.currentItems;
        this.pagetitle = this.itemtitle;
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
