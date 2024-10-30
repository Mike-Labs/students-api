import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonFab, IonFabButton, IonIcon, IonLabel, IonButton, IonImg,IonGrid,IonRow,IonCol, IonText, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Barcode, BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController, Platform,NavController, ModalController } from '@ionic/angular';
import { CommonModule, NgFor } from '@angular/common';
import { Capacitor } from '@capacitor/core';
import { Router } from '@angular/router';
import { BarcodeService } from '../services/barcode.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonText, IonImg, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonFab, IonFabButton, IonIcon, IonLabel, NgFor,CommonModule,IonGrid,IonRow,IonCol, IonButtons, IonBackButton ],
  providers: [ModalController]
})
export class HomePage implements OnInit {
  isSupported = false;
  barcodes: Barcode[] = [];
  public code: string = '';

  constructor(private alertController: AlertController, private platform: Platform , public navCtrl: NavController,private modalCtrl: ModalController,private router:Router ,private barcodeService:BarcodeService) {}

  async ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      BarcodeScanner.isSupported().then((result) => {
        this.isSupported = result.supported;
      });
    } else {
      console.warn('Barcode scanner is not supported on this platform');
    }
  }

  async scanCode() {
    if (!this.platform.is('cordova') && !this.platform.is('capacitor')) {
      
      const alert = await this.alertController.create({
        header: 'Warning',
        message: 'Barcode scanning is not supported on this platform.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      
      await BarcodeScanner.requestPermissions();

      
      await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable().then(async (data) => {
        if (data.available) {
          
          const barcodes = await this.startScanner();
          this.code = barcodes[0].rawValue;
          this.scan();
        } else {
          
          await BarcodeScanner.installGoogleBarcodeScannerModule().then(async () => {
            const barcodes = await this.startScanner();
            this.code = barcodes[0].rawValue;
            this.scan();
          });
        }
      });
    } catch (error) {
      console.error('Barcode scanning failed', error);
    }
  }

  async startScanner() {
    const { barcodes } = await BarcodeScanner.scan({
      formats: [BarcodeFormat.QrCode, BarcodeFormat.Ean13],
    });
    return barcodes;
  }


  async scan() {
    console.log('Scanned code:', this.code);

    try {
      const scannedDetails = this.parseVCard(this.code);  // Parse vCard details

      // Store details in the BarcodeService
      this.barcodeService.setDetails({
        name: scannedDetails.name,
        gender: scannedDetails.gender,
        age: scannedDetails.age,
        id: scannedDetails.id,
        area: scannedDetails.area,
        meal_card_number: scannedDetails.meal_card_number,
        school: scannedDetails.school,
        guardian_name: scannedDetails.guardian_name,
        company: scannedDetails.company,
        phone: scannedDetails.phone,
        email: scannedDetails.email,
        image: scannedDetails.image
      });

      // Navigate to the profile page
      this.router.navigate(['/profile']);
    } catch (e) {
      console.error('Error parsing QR code:', e);
    }
  }

  parseVCard(vCard: string) {
    const details: any = {};

    // Split the vCard by new lines
    const lines = vCard.split(/\r?\n/);

    lines.forEach(line => {
      if (line.startsWith('N:')) {
        details.name = line.replace('N:', '').trim();
      }
      else if (line.startsWith('GENDER:')) {
        details.gender = line.replace('GENDER:', '').trim();
      }
      else if (line.startsWith('AGE:')) {
        details.age = line.replace('AGE:', '').trim();
      }
      else if (line.startsWith('ID:')) {
        details.id = line.replace('ID:', '').trim();
      }
      else if (line.startsWith('AREA:')) {
        details.area = line.replace('AREA:', '').trim();
      }
      else if (line.startsWith('MEAL NO:')) {
        details.meal_card_number = line.replace('MEAL NO:', '').trim();
      }
      else if (line.startsWith('SCHOOL:')) {
        details.school = line.replace('SCHOOL:', '').trim();
      }
      else if (line.startsWith('GUARDIAN:')) {
        details.guardian_number = line.replace('GUARDIAN:', '').trim();
      }
       else if (line.startsWith('ORG:')) {
        details.company = line.replace('ORG:', '').trim();
      } else if (line.startsWith('TEL:')) {
        details.phone = line.replace('TEL:', '').trim();
      } else if (line.startsWith('EMAIL:')) {
        details.email = line.replace('EMAIL:', '').trim();
      } else if (line.startsWith('PHOTO;VALUE=uri:')) {
        details.image = line.replace('PHOTO;VALUE=uri:', '').trim();
      }
    });

    return details;
  }
}
