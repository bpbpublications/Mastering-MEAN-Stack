import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiconfigService {
  BASE_URL='https://blog.dev';
  constructor(private httpClient: HttpClient) {
    
    

  }
  get(url: string){
   return this.httpClient.get(`${this.BASE_URL}/${url}`);   
  }

  post(url: string, data: Object) {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type','application/json');
    console.log('in post method of apiconfig service')
    console.log (`${this.BASE_URL}/${url}`);
    console.log(data);
    
    return this.httpClient.post(`${this.BASE_URL}/${url}`,data);
    
  }
  

  put(url: string, data: Object){
    return this.httpClient.put(`${this.BASE_URL}/${url}`,data);   
  }
  delete(url: string, data: Object){
    return this.httpClient.delete(`${this.BASE_URL}/${url}`);   
  }

}
