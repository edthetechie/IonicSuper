import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../../providers/providers';

@Injectable()
export class Items {
  items: Item[] = [];
  sources = [];

  constructor(public api: Api) {

  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  sourcesquery(source?: any) {
    let seq = this.api.get('sources').share();
    seq.subscribe((res: any) => {
      this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  challengesquery(source?: any) {
    let seq = this.api.get('challenges').share();
    seq.subscribe((res: any) => {
      this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  indicatorsquery(source?: any) {
    let seq = this.api.get('list').share();
    seq.subscribe((res: any) => {
      this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  searchquery(search?: any) {
    let seq = this.api.get('list?q=' + search.q).share();
    seq.subscribe((res: any) => {
      this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  indicatorssummaryquery(source?: any) {
    let seq = this.api.get('list?ws=1').share();
    seq.subscribe((res: any) => {
      this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  indicatorsexportquery(source?: any) {
    let seq = this.api.get('list?typeToReturn=email').share();
    seq.subscribe((res: any) => {
      console.log(res);
      this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  itemquery(item?: any) {
    // var itemtosend = '{source:'+ item + '}';
    // console.log(itemtosend);
    let seq = this.api.get('list?source=' + item).share();
    seq.subscribe((res: any) => {
        this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  itemsummaryquery(item?: any) {
    // var itemtosend = '{source:'+ item + '}';
    // console.log(itemtosend);
    let seq = this.api.get('list?ws=1&source=' + item).share();
    seq.subscribe((res: any) => {
        this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }  
  itemexportquery(item?: any) {
    // var itemtosend = '{source:'+ item + '}';
    // console.log(itemtosend);
    let seq = this.api.get('list?typeToReturn=email&source=' + item).share();
    seq.subscribe((res: any) => {
        this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  tagsdetailquery(item?: any) {
    // var itemtosend = '{source:'+ item + '}';
    // console.log(itemtosend);
    let seq = this.api.get('list?tag=' + item).share();
    seq.subscribe((res: any) => {
        this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  tagsummaryquery(item?: any) {
    // var itemtosend = '{source:'+ item + '}';
    // console.log(itemtosend);
    let seq = this.api.get('list?ws=1&tag=' + item).share();
    seq.subscribe((res: any) => {
        this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  tagsexportquery(item?: any) {
    // var itemtosend = '{source:'+ item + '}';
    // console.log(itemtosend);
    let seq = this.api.get('list?typeToReturn=email&tag=' + item).share();
    seq.subscribe((res: any) => {
        this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }  
  sectorsdetailquery(item?: any) {
    // var itemtosend = '{source:'+ item + '}';
    // console.log(itemtosend);
    let seq = this.api.get('list?sector=' + item).share();
    seq.subscribe((res: any) => {
        this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  sectorssummaryquery(item?: any) {
    // var itemtosend = '{source:'+ item + '}';
    // console.log(itemtosend);
    let seq = this.api.get('list?ws=1&sector=' + item).share();
    seq.subscribe((res: any) => {
        this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  sectorsexportquery(item?: any) {
    // var itemtosend = '{source:'+ item + '}';
    // console.log(itemtosend);
    let seq = this.api.get('list?typeToReturn=email&sector=' + item).share();
    seq.subscribe((res: any) => {
        this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }  
  challengequery(item?: any) {
    // var itemtosend = '{source:'+ item + '}';
    // console.log(itemtosend);
    let seq = this.api.get('challenges?challengeid=' + item).share();
    seq.subscribe((res: any) => {
        this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
  challengesexportquery(item?: any) {
    // var itemtosend = '{source:'+ item + '}';
    // console.log(itemtosend);
    let seq = this.api.get('challenges?typeToReturn=email&challengeid=' + item).share();
    seq.subscribe((res: any) => {
        this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }  
  sectorsquery(item?: any) {
    // var itemtosend = '{source:'+ item + '}';
    // console.log(itemtosend);
    let seq = this.api.get('sectors').share();
    seq.subscribe((res: any) => {
        this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  tagsquery(item?: any) {
    // var itemtosend = '{source:'+ item + '}';
    // console.log(itemtosend);
    let seq = this.api.get('tags').share();
    seq.subscribe((res: any) => {
        this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item?: any) {
    // var itemtosend = '{source:'+ item + '}';
    // console.log(itemtosend);
    let seq = this.api.delete('sources?id=' + item).share();
    seq.subscribe((res: any) => {
        this.sources = res;
    }, err => {
      console.error('ERROR', err);
    });
    return seq;
  }
}
