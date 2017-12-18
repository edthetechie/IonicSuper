import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class Items {
  items: Item[] = [];
  constructor(public api: Api) { }

  query(params?: any) {
    // let items = this.api.get('/sources', params);
    return this.items;
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
