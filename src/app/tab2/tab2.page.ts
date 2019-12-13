import { Component } from '@angular/core';
import { TodoservicioService } from '../servicios/todoservicio.service';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EditpagePage } from '../editpage/editpage.page';
import { ToolsComponent } from '../tools/tools.component';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public listadoPanel;
  public listadoPanelS;
  constructor(private todoS: TodoservicioService,
    public loadingController: LoadingController,
    private router: Router,
    public alertController: AlertController,
    public modalController: ModalController,
    public tools: ToolsComponent) {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando',
    });
    await loading.present();
  }

  ionViewDidEnter() {
    this.refrescar();
    console.log("Solicitada la petición");
  }


  public doRefresh(e: any) {
    this.refrescar().then(() => {
      e.target.complete()
    },
      error => {
        console.log('Refrescar fallido')
        e.target.complete()
      });
  }

  public irNueva(): void {
    this.router.navigateByUrl('/tabs/tab1');
  }

  public search(evt): void {
    const searchTerm = evt.srcElement.value;
    //Si está el cuadro de búsqueda vacío, reestablecemos la búsqueda
    if (!searchTerm) {
      this.listadoPanel = this.listadoPanelS;
      return;
    }
    this.listadoPanel = this.listadoPanel.filter(currentGoal => {
      if (currentGoal.title && searchTerm) {
        if (currentGoal.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  async borraNota(id: string) {
    const alert = await this.alertController.create({
      header: 'Borrar Nota',
      message: '¿Está seguro de que desea borrar la nota?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.removeNota(id);
          }
        }
      ]
    });
    await alert.present();
  }

  private removeNota(id: string){
    this.todoS.remoteTODO(id).then((salida) => {
      this.refrescar();
      console.log("Borrando");
      this.tools.showToast("Nota borrada correctamente", 'success');
    }).catch((err) => {
      console.log(err);
      this.tools.showToast("No se pudo borrar la nota", 'danger', 4000);
    })
  }

  async presentModal(id: string, title: string, description: string) {
    const modal = await this.modalController.create({
      //Introducimos la página que hemos creado
      component: EditpagePage,
      componentProps: {
        'id': id,
        'title': title,
        'description': description
      }
    });
    //Lanzamos el modal
    await modal.present();
    //Esperamos a que se cierre
    return await modal.onWillDismiss().then(()=>{
      //Refrescamos la lista y notificamos al usuario
      this.refrescar();
    });
  }

  private async refrescar() {
    this.presentLoading();
    try {
      let Myobservable = this.todoS.readTODO();
      Myobservable.subscribe((lista) => {
        this.listadoPanel = [];
        this.listadoPanelS = [];
        lista.docs.forEach((nota) => {
          this.listadoPanel.push({ id: nota.id, ...nota.data() });
          this.listadoPanelS.push({ id: nota.id, ...nota.data() });
        });
        this.loadingController.dismiss();
      })
    } catch (err) {
      this.loadingController.dismiss();
    }
  }
}
