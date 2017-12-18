import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController, ModalController, ViewController } from 'ionic-angular';
import { BrowserTab } from '@ionic-native/browser-tab';
import { FormControl } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

import { Items, SourceProvider } from '../../providers/providers';

import { FirstRunPage, SourcesPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage {

  item: any;
  itemtitle: any;
  pagetitle: any;
  sourceid: any;
  itemurl: any;
  private loginErrorString: string;
  private currentItems: any;
  private filteredItems: any; 
  loadingitems: any;
  loadingexport: any;
  exportresponse: any;
  exportAlertMessage: any;
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public items: Items, 
    public toastCtrl: ToastController, 
    public browserTab: BrowserTab,
    public source: SourceProvider,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController, 
    public loadingController: LoadingController,
    public alertCtrl: AlertController
  ) {
    
    this.searchControl = new FormControl();
  
  }

    onPageWillEnter(){
      this.refreshTheServerData();
    }

    ionViewDidLoad() {
      this.setFilteredItems();
      if (!this.navParams.get('item')) {
        this.navCtrl.push(SourcesPage);
      }      
      this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
          this.searching = false;
          this.setFilteredItems();
      });
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

    ionViewWillEnter() {
      this.viewCtrl.showBackButton(true);
      this.refreshTheServerData();
    }

    onSearchInput(){
      this.searching = true;
    }

    openUrl(itemurl) {
      window.open(itemurl);// open URL with InAppBrowser instead or SafariViewController
    }

    deleteItem(item) {

      let confirm = this.alertCtrl.create({
        title: 'Are you sure?',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Yes',
            handler: () => {
              // console.log(item);
              this.source.delete(this.item).subscribe((resp) => {
                this.navCtrl.push(SourcesPage);
                // console.log(this.pagetitle);
              }, (err) => {
                // Unable to log in
                let toast = this.toastCtrl.create({
                  message: this.loginErrorString,
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
              });  
            }
          }
        ]
      });
      confirm.present();

      
    } 

    showSummary(summarytype){
      this.item = this.navParams.get('item');
      let summaryModal = this.modalCtrl.create('SummaryPage', { summarytype: summarytype, sourceid: this.item });
      summaryModal.present();
    }  


    doExport(sourceid){
      this.loadingexport = this.loadingController.create();
      //this.sources = this.items.query();
      this.loadingexport.present();
      this.sourceid = this.navParams.get('sourceid');
      this.items.itemexportquery(this.sourceid).subscribe((resp) => {
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

        this.loadingexport.dismiss();
        if (err.statusText == 'Not Authenticated - No Device Token') {
          this.navCtrl.push(FirstRunPage);
        }   
      });  
    } 


    refreshTheServerData() {

      this.loadingitems = this.loadingController.create();
      this.loadingitems.present();
      this.item = this.navParams.get('item');
      this.itemtitle = this.navParams.get('itemtitle') || 'No source name found!';
      this.items.itemquery(this.item).subscribe((resp) => {
        this.currentItems = resp;
        this.filteredItems = this.currentItems;
        this.pagetitle = this.itemtitle;
        this.sourceid = this.item;
        this.loadingitems.dismiss();
        // console.log(this.pagetitle);
      }, (err) => {
        // Unable to log in
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.loadingitems.dismiss();
      });   

    }

}
