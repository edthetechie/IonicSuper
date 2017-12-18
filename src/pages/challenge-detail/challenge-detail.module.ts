import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ChallengeDetailPage } from './challenge-detail';

@NgModule({
  declarations: [
    ChallengeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ChallengeDetailPage),
    TranslateModule.forChild()
  ],
  exports: [
    ChallengeDetailPage
  ]
})
export class ChallengePageModule { }
