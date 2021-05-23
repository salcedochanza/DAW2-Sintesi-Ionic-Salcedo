import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListRecursosPage } from './list-recursos.page';

const routes: Routes = [
  {
    path: '',
    component: ListRecursosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRecursosPageRoutingModule {}
