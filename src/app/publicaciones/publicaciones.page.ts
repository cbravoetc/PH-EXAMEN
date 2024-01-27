import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Message } from '../message';
import { MessageService } from '../services/message-service.service';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonModal, IonThumbnail, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, trashOutline } from 'ionicons/icons';
import { AlertController } from '@ionic/angular';
import { MensajeDetalleComponent } from '../services/mensaje-detalle/mensaje-detalle.component';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.page.html',
  styleUrls: ['./publicaciones.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonTitle, IonToolbar,IonContent, IonList, IonItem, IonThumbnail, IonImg, IonLabel, IonIcon, IonFab, IonFabButton, IonModal],
})
export class PublicacionesPage implements OnInit {
  mensajes: Message[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private messageService: MessageService, 
    private router: Router
  ) {
    addIcons({ 
      'trash-outline': trashOutline, 
      'add-circle-outline' : addCircleOutline,
    });

  }

  async ngOnInit() {
    this.mensajes = await this.messageService.getMensajes();
  }

  async ionViewDidEnter() {
    this.mensajes = await this.messageService.getMensajes();
  }

  navegarAPublicacion() {
    this.router.navigateByUrl('/publicacion');
  }

  async abrirDetalleMensaje(mensaje: Message) {
    const modal = await this.modalController.create({
      component: MensajeDetalleComponent,
      componentProps: {
        mensaje: mensaje,
      },
    });
    return await modal.present();
  }

  async borrarMensaje(mensajeId: number) {
    await this.messageService.borrarMensaje(mensajeId);
    this.mensajes = await this.messageService.getMensajes(); // Refrescar la lista después de borrar
  }

  async confirmDelete(mensajeId: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que quieres eliminar esta publicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.borrarMensaje(mensajeId);
            console.log('Publicación eliminada');
          }
        }
      ]
    });

    await alert.present();
  }
}
