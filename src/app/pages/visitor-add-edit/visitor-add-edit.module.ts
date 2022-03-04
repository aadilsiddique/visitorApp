import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitorAddEditPageRoutingModule } from './visitor-add-edit-routing.module';

import { VisitorAddEditPage } from './visitor-add-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitorAddEditPageRoutingModule
  ],
  declarations: [VisitorAddEditPage]
})
export class VisitorAddEditPageModule {}
