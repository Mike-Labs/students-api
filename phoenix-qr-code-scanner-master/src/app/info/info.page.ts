import { BarcodeService } from './../services/barcode.service';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class InfoPage implements OnInit {

  scannedCode: string | null = '';

  constructor(private barcodeService:BarcodeService) { }

  ngOnInit() {
    // this.scannedCode = this.barcodeService.getBarcode();
  }

}
