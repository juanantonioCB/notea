import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { EditpagePage } from '../editpage/editpage.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    ReactiveFormsModule
  ],
  declarations: [Tab2Page,EditpagePage],
  entryComponents:[EditpagePage]
})
export class Tab2PageModule {}
