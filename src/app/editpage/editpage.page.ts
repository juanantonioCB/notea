import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { note } from '../modelo/note';
import { TodoservicioService } from '../servicios/todoservicio.service';
import { ToolsComponent } from '../tools/tools.component';


@Component({
  selector: 'app-editpage',
  templateUrl: './editpage.page.html',
  styleUrls: ['./editpage.page.scss'],
})
export class EditpagePage implements OnInit {

  public todoForm: FormGroup;
  @Input() id: string;
  @Input() title: string;
  @Input() description: string;

  constructor(private formBuilder: FormBuilder,
    navParams: NavParams,
    public modalController: ModalController,
    private todoS: TodoservicioService,
    private tools: ToolsComponent) {
  }

  public editNote() {
    //Construimos la nota
    let data: note;
    data = {
      title: this.todoForm.get('title').value,
      description: this.todoForm.get('description').value
    }
    //Actualizamos
    this.todoS.updateTodo(this.id, data).then((ok) => {
      //Reseteamos el formulario
      this.todoForm.reset();
      this.tools.showToast("Nota actualizada correctamente", "success");
    })
      .catch((err) => {
        this.tools.showToast("La nota no se pudo actualizar", "danger");
      })
      .finally(() => {
        //Cerramos el modal
        this.close();
      })
  }
  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      title: [this.title, Validators.required],
      description: [this.description]
    });
  }

  close() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
