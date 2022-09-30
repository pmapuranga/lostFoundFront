import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 

    
  }

  register(userData:any){
      return this.http.post(`${environment.baseUrl}users`, userData);
  }
  saveRecord(recordData:any){
      return this.http.post(`${environment.baseUrl}records`, recordData);
  }
  login(userData:any){
      return this.http.post(`${environment.baseUrl}users/login`, userData);
  }

  getRandomNumber(){
    return this.http.get(`${environment.randomNumberBaseUrl}random?min=100&max=10000&count=1`)
  }
  
  getRecords(){
    return this.http.get(`${environment.baseUrl}records`)
  }
  
}
