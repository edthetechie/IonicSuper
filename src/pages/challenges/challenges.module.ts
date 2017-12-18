import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { ChallengesList } from './challenges';

@NgModule({
  declarations: [
    ChallengesList,
  ],
  imports: [
    IonicPageModule.forChild(ChallengesList),
    TranslateModule.forChild()
  ],
  exports: [
    ChallengesList
  ]
})
export class ChallengePageModule { }
