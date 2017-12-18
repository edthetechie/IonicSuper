import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { TagsPage } from './tags';

@NgModule({
  declarations: [
    TagsPage,
  ],
  imports: [
    IonicPageModule.forChild(TagsPage),
    TranslateModule.forChild()
  ],
  exports: [
    TagsPage
  ]
})
export class TagsPageModule { }
