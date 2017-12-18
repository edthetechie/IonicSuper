import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SectorsDetailPage } from './sectors-detail';

@NgModule({
  declarations: [
    SectorsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SectorsDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    SectorsDetailPage
  ]
})
export class SectorsDetailPageModule { }
