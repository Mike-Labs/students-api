import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {

  private details: any = {}; 

  constructor() { }

  setDetails(details: { name: string, gender: string, age: string, id: string, area: string, meal_card_number: string, school: string, guardian_name: string, phone: string, email: string, company: string, image: string }) {
    this.details = details;
  }

  getDetails() {
    return this.details;
  }
}

