import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntranetRoutingModule } from './intranet-routing.module';
import {IntranetComponent} from './intranet.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
  declarations: [
    IntranetComponent
  ],
  imports: [
    CommonModule,
    IntranetRoutingModule,
    IonicModule
  ]
})
export class IntranetModule { }
