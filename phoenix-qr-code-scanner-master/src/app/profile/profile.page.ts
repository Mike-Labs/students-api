import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonFab, IonFabButton, IonItem, IonLabel, IonItemDivider, IonList,
  IonRow, IonCol, IonButton, IonIcon, IonGrid, IonImg, IonText
 } from '@ionic/angular/standalone';

 import { BarcodeService } from '../services/barcode.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonFab, IonFabButton, IonItem, IonLabel, IonItemDivider, IonList, IonRow, IonCol, IonButton, IonIcon, IonGrid, IonImg, IonText
  ]
})
export class ProfilePage implements OnInit {

  name!: string;
  gender!: string;
  age!: string;
  id!: string;
  area!: string;
  meal_card_number!: string;
  school!: string;
  guardian_name!: string;
  company!: string;
  phone!: string;
  email!: string;
  image!: string;

  constructor(private barcodeService: BarcodeService) { }

  ngOnInit() {
            // Get the details from BarcodeService
            const details = this.barcodeService.getDetails();
            if (details) {
              this.name = details.name;
              this.gender = details.gender;
              this.age = details.age;
              this.id = details.id;
              this.area = details.area;
              this.meal_card_number = details.meal_card_number;
              this.school = details.school;
              this.guardian_name = details.guardian_name;
              this.company = details.company;
              this.phone = details.phone;
              this.email = details.email;
              this.image = details.image;
            }
  }
  

}
