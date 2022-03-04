import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LattestNewsPageRoutingModule } from './lattest-news-routing.module';

import { LattestNewsPage } from './lattest-news.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LattestNewsPageRoutingModule
  ],
  declarations: [LattestNewsPage]
})
export class LattestNewsPageModule {}
