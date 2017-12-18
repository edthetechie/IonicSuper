import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';


@Injectable()
export class SourceProvider {
  sources = [];
  sourcedelete: any;
  constructor(
    public api: Api
  ) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  add(sourceInfo: any) {
    // console.log(sourceInfo);
    let sourceschange = this.api.post('sources', sourceInfo).share();

    sourceschange.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log(res);
    }, err => {
      console.error('ERROR', err);
    });

    return sourceschange;
  }

  delete(item?: any) {
    // var itemtosend = '{source:'+ item + '}';
    // console.log(itemtosend);
    let seq = this.api.get('sources?deletesource=' + item).share();
    seq.subscribe((res: any) => {
        this.sourcedelete = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

}
