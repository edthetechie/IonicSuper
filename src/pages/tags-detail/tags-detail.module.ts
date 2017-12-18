import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TagsDetailPage } from './tags-detail';

@NgModule({
  declarations: [
    TagsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TagsDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    TagsDetailPage
  ]
})
export class TagsDetailPageModule { }
