import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { MessageService } from '../services/message-service.service';
import { Message } from '../message';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.page.html',
  styleUrls: ['./publicacion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule] 
})
export class PublicacionPage {
  mensaje: Message = {
    id: null,
    image: '',
    titulo: '',
    fecha: '',
    descripcion: ''
  };

  constructor(private messageService: MessageService, private router: Router) {
    addIcons({ 
      'camera-outline': cameraOutline, 
    });
  }

  guardarMensaje() {
    const fechaActual = new Date();

    this.mensaje.fecha = fechaActual.toISOString().split('T')[0];
    this.messageService.agregarMensaje(this.mensaje);
    this.router.navigateByUrl('/publicaciones'); 
  }

  async tomarFoto() {
    try {
      const imagen = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
  
      if (imagen.webPath) {
        this.mensaje.image = imagen.webPath; 
      } else {
        console.error('La ruta de la imagen está indefinida.');
      }
    } catch (error) {
      console.error(error);
    }
  }  
}
