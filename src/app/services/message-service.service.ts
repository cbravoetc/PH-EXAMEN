import { Injectable } from '@angular/core';
import { Message } from '../message';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private mensajes: Message[] = [];
  private ultimoId: number = 0;

  constructor() {
    this.cargarDatos(); // Llama a cargarDatos durante la inicialización del servicio
  }

  private async cargarDatos() {
    const mensajesGuardados = await Preferences.get({ key: 'mensajes' });
    const ultimoIdGuardado = await Preferences.get({ key: 'ultimoId' });

    this.mensajes = mensajesGuardados.value ? JSON.parse(mensajesGuardados.value) : [
      {
        id: 1,
        image: 'assets/images/lost_dog.jpg',
        titulo: 'Perro Perdido',
        fecha: '2024-01-18',
        descripcion: 'Perro perdido en Vallejos con Ibieta, responde al nombre de Benji, llamar al 95876545'
      },
      {
        id: 2,
        image: 'assets/images/passport_founded.jpg',
        titulo: 'Pasaporte Encontrado',
        fecha: '2024-01-09',
        descripcion: 'Encontré este pasaporte de nacionalidad que desconozco, reclamar al numero 96556485'
      }
    ];

    this.ultimoId = ultimoIdGuardado.value ? parseInt(ultimoIdGuardado.value) : this.mensajes.length;
  }

  async getMensajes(): Promise<Message[]> {
    const mensajes = await Preferences.get({ key: 'mensajes' });
    return mensajes.value ? JSON.parse(mensajes.value) : [];
  }
  

  async agregarMensaje(mensaje: Message) {
    const newId = this.mensajes.length + 1;
    mensaje.id = newId;
    this.mensajes.push(mensaje);
    await Preferences.set({
      key: 'mensajes',
      value: JSON.stringify(this.mensajes)
    });
  }

  async borrarMensaje(id: number) {
    this.mensajes = this.mensajes.filter(m => m.id !== id);
    await Preferences.set({
      key: 'mensajes',
      value: JSON.stringify(this.mensajes)
    });
  }
}
