import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'https://randomuser.me/api/?results=50'; // API endpoint

  constructor(private http: HttpClient) { }

  getStudents(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
