import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LattestNewsPage } from './lattest-news.page';

const routes: Routes = [
  {
    path: '',
    component: LattestNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LattestNewsPageRoutingModule {}
