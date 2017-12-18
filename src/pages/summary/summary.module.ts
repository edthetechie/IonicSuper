import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { SummaryPage } from './summary';

@NgModule({
  declarations: [
    SummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(SummaryPage),
    TranslateModule.forChild()
  ],
  exports: [
    SummaryPage
  ]
})
export class SummaryPageModule {}
