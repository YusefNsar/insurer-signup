import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posts } from '../../_model/posts';

@Injectable({
  providedIn: 'root'
})
export class MasterServiceService {

  constructor( private http:HttpClient) { }

  getall(){
    return this.http.get<Posts[]>('http://localhost:3000/posts');
  }
}
