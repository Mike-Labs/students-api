import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent,IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { NavController, ModalController } from '@ionic/angular';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
  standalone: true,
  imports: [IonContent, IonTitle, IonToolbar, CommonModule, FormsModule], 
   providers: [ModalController]
})
export class ModalPage  {

  constructor( public navCtrl: NavController , private modalCtrl:ModalController) { }


  dismiss(){
    this.modalCtrl.dismiss();
  }

}
