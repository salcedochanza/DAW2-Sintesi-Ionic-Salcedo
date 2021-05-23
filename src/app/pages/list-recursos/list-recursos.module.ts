import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListRecursosPageRoutingModule } from './list-recursos-routing.module';

import { ListRecursosPage } from './list-recursos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListRecursosPageRoutingModule
  ],
  declarations: [ListRecursosPage]
})
export class ListRecursosPageModule {}
