import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';

import { Items } from '../../providers/providers';

import { FirstRunPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {

stype: any;
sourceid: any;
loading: any;
tagname: any;
sectorid: any;

private currentItems: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public items: Items, 
    public toastCtrl: ToastController,
    public loadingController: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.stype = this.navParams.get('summarytype');
    // console.log('summarytype:', this.stype);
    this.refreshTheServerData();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }  

  refreshTheServerData() {
    this.loading = this.loadingController.create();
    //this.sources = this.items.query();
    this.loading.present();

    if (this.stype == 'indicators') {
      //console.log(this.stype);
      this.items.indicatorssummaryquery().subscribe((resp) => {
        this.currentItems = resp;
        this.currentItems = this.currentItems.items;
        //console.log(resp);
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
    else if (this.stype == 'sourceindicators') {
      //console.log(this.stype);
      this.sourceid = this.navParams.get('sourceid');
      this.items.itemsummaryquery(this.sourceid).subscribe((resp) => {
        this.currentItems = resp;
        this.currentItems = this.currentItems.items;
        //console.log(resp);
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
    else if (this.stype == 'tags') {
      this.tagname = this.navParams.get('tagname');
      console.log(this.sourceid);
      this.items.tagsummaryquery(this.tagname).subscribe((resp) => {
        this.currentItems = resp;
        this.currentItems = this.currentItems.items;
        //console.log(resp);
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
    else if (this.stype == 'sectors') {
      this.sectorid = this.navParams.get('sectorid');
      //console.log(this.sectorid);
      this.items.sectorssummaryquery(this.sectorid).subscribe((resp) => {
        this.currentItems = resp;
        this.currentItems = this.currentItems.items;
        //console.log(resp);
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
  }  

}
