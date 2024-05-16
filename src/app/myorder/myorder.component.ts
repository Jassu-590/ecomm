import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrl: './myorder.component.css'
})
export class MyorderComponent implements OnInit{

  orderdata:order[]|undefined
 constructor(private product:ProductService){}
  ngOnInit(): void {
    this.getOrderlist()
  }

  cancelorder(orderid:string|undefined){
    orderid && this.product.cancelorder(orderid).subscribe((result)=>{
       this.getOrderlist();
    })
  }


  getOrderlist(){
    this.product.orderlist().subscribe((result)=>{
      
      this.orderdata=result
     
    })
  }
}
