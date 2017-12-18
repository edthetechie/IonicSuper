import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { IndicatorsPage } from './indicators';

@NgModule({
  declarations: [
    IndicatorsPage,
  ],
  imports: [
    IonicPageModule.forChild(IndicatorsPage),
    TranslateModule.forChild()
  ],
  exports: [
    IndicatorsPage
  ]
})
export class IndicatorsPageModule {}
