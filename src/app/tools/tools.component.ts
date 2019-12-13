import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent implements OnInit {

  constructor(private toastController: ToastController,
    private alertController: AlertController,
    public loadingController: LoadingController) { }

  ngOnInit() {}

  async showToast(msg: string, col: string, dur: number = 2000) {
    const toast = await this.toastController.create({
      message:'<img src="https://i.imgur.com/fiNHSnL.png"</img>'+ msg,
      duration: dur,
      color: col
    });
    toast.present();
  }

  async showAlert(header:string,message:string) {
    const alert = await this.alertController.create({
      header: header,
      message:'<img src="https://i.imgur.com/RQaxxYU.png"</img>'+ message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Agregando...'
    });
    await loading.present();
  }

}
