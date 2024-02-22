import { Component, OnInit } from '@angular/core';
import { MasterServiceService } from '../../_service/master-service.service';
import { Posts } from '../../../_model/posts';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{
  constructor(private service:MasterServiceService){

  }
  postdata!: Posts[];
  ngOnInit(): void {
    this.LoadInitialData();
  }

  LoadInitialData(){
    this.service.getall().subscribe(item => {
      this.postdata=item;
      console.log(this.postdata);
    })
  }
}
