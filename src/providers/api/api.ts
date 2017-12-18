import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {  } from 'ionic-angular';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'https://demoapi.shapingtomorrow.com';
  apikey: string = 'E015BF78155D01023581174418263FE4';
  deviceid: string = 'Ionic2TestApp';
  devicetoken: string = '';
  

  constructor(
    public storage: Storage, 
    public http: HttpClient,
    
  ) {
    this.storage.get("_devicetoken")
      .then(value => {
        if (value !== null) {
          this.devicetoken = value;
        }
      });
   
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    //reqOpts.params = new HttpParams();
    
    if (params) {
      console.log(params);
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }
    //console.log(reqOpts);
    //console.log(this.deviceid.match('devicetoken'));
    if (this.deviceid.match('devicetoken')) {
      
    }
    else if (this.devicetoken) {
      this.deviceid = this.deviceid + '&devicetoken=' + this.devicetoken;
    }
    // this.loading.present();
    //console.log(reqOpts);
    //console.log(this.deviceid);
    return this.http.get(this.url + '/' + endpoint + '&deviceid=' + this.deviceid + '&apikey=' + this.apikey, reqOpts);

  }

  post(endpoint: string, body: any, reqOpts?: any) {
    if (this.deviceid.match('devicetoken')) {
      
    }
    else if (this.devicetoken) {
      this.deviceid = this.deviceid + '&devicetoken=' + this.devicetoken;
    }
    return this.http.post(this.url + '/' + endpoint + '?deviceid=' + this.deviceid + '&apikey=' + this.apikey, body, {
      params: new HttpParams().set('apiKey', this.apikey)
    })
    .share();
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    if (this.deviceid.match('devicetoken')) {
      
    }
    else if (this.devicetoken) {
      this.deviceid = this.deviceid + '&devicetoken=' + this.devicetoken;
    }
    return this.http.delete(this.url + '/' + endpoint + '&deviceid=' + this.deviceid + '&apikey=' + this.apikey, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }
}
