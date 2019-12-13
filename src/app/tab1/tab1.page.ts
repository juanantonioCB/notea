import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { note } from '../modelo/note';
import { TodoservicioService } from '../servicios/todoservicio.service';

import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { ToolsComponent } from '../tools/tools.component';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public todoForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private todoS: TodoservicioService,
    private flashlight: Flashlight,
    private geolocation: Geolocation,
    public tools: ToolsComponent,

    ) {

  }
  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  public ubication() {
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      this.tools.showAlert("Ubicación", 
      "Latitud: " + geoposition.coords.latitude.toString() + 
      "\nLongitud: " + geoposition.coords.longitude.toString());
    });
  }

  public turnFlash() {
    //Comprobamos si está encendida
    if (this.flashlight.isSwitchedOn()) {
      //Si está encendida la apagamos
      this.flashlight.switchOff();
      this.tools.showToast('Flash Apagado', 'danger');
    } else {
      //Si no está encendida, la encendemos
      this.flashlight.switchOn().then(res => {
        this.tools.showToast('Flash Encendido', 'success');
      });
    }
  }

  addNote() {
    let data: note;
    data = {
      title: this.todoForm.get('title').value,
      description: this.todoForm.get('description').value
    }
    this.tools.presentLoading();
    this.todoS.addTODO(data).then((ok) => {
      this.todoForm.reset();
      this.tools.showToast("Nota agregada", 'success');
    })
      .catch((err) => {
        this.tools.showToast("Error", 'danger', 4000);
      })
      .finally(() => {
        this.tools.loadingController.dismiss();
      })
  }

}
