import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowRecursPageRoutingModule } from './show-recurs-routing.module';

import { ShowRecursPage } from './show-recurs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowRecursPageRoutingModule
  ],
  declarations: [ShowRecursPage]
})
export class ShowRecursPageModule {}
