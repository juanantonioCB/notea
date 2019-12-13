import { Component, Input, NgModule } from '@angular/core';
import { NavParams, IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditpagePage } from './editpage.page';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,BrowserModule
  ],
  declarations: [EditpagePage]
})
@Component({
  selector: 'modal-page',
})

export class EditpagePageModule {
  constructor(){}
}
