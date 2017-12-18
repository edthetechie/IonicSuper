import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SectorsPage } from './sectors';

@NgModule({
  declarations: [
    SectorsPage,
  ],
  imports: [
    IonicPageModule.forChild(SectorsPage),
    TranslateModule.forChild()
  ],
  exports: [
    SectorsPage
  ]
})
export class SectorsPageModule { }
