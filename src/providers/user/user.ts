import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

import { Storage } from '@ionic/storage';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;
  _client: any;
  _devicetoken: any;
  _token: any;

  constructor(public storage: Storage, public api: Api) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('authenticate', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.STATUS == 'success') {
        this._loggedIn(res);
        this.api.devicetoken = res.DEVICETOKEN;
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let dosignup = this.api.post('register', accountInfo).share();

    dosignup.subscribe((res: any) => {
      // console.log(res);
      // If the API returned a successful response, mark the user as logged in
      if (res.SUCCESS !== '') {
        //console.log(accountInfo);
        this.api.devicetoken = res.DEVICETOKEN;
        return this.storage.set("_devicetoken", res.DEVICETOKEN);
        //this.login(accountInfo);
      }
      else if (res.ERROR == 'That email address is already registered') {
        //console.log(accountInfo);
        this.api.devicetoken = res.DEVICETOKEN;
        return this.storage.set("_devicetoken", res.DEVICETOKEN);
        //this.login(accountInfo);
      }
    }, err => {
      console.error('ERROR usert.ts: ', err);
    });

    return dosignup;
  }

  contactus(contactInfo: any) {
    let sendcontact = this.api.post('contact', contactInfo).share();

    sendcontact.subscribe((res: any) => {
      // console.log(res);
      // If the API returned a successful response, mark the user as logged in
      console.log(res);
    }, err => {
      console.error('ERROR: ', err);
    });

    return sendcontact;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
    this.storage.remove("_devicetoken");
    this.storage.remove("_clientname");
  }

  /**
   * Process a login/signup response to store user data
   */
  isLoggedIn() {
    this.storage.get("_devicetoken").then(data => {
      // console.log("1: " + data);
      return data;
    });
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.DEVICETOKEN;
    this.api.devicetoken = resp.DEVICETOKEN;
    this.storage.set("_clientname", resp.SCANCLIENTNAME);
    return this.storage.set("_devicetoken", resp.DEVICETOKEN);
  }

}
