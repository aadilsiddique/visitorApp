import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorAddEditPage } from './visitor-add-edit.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorAddEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorAddEditPageRoutingModule {}
