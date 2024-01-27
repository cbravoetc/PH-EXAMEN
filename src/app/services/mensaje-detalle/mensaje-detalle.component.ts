import { Component, Input } from '@angular/core';
import { Message } from 'src/app/message';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-mensaje-detalle',
  templateUrl: './mensaje-detalle.component.html',
  styleUrls: ['./mensaje-detalle.component.scss'],
  standalone: true,
  imports:[IonHeader, IonToolbar, IonTitle, IonButtons,IonButton, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent]
})
export class MensajeDetalleComponent {
  @Input() mensaje!: Message;

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }
}

