import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  totalprice:number|undefined
  cartData:cart[]|undefined
  ordermsg:string|undefined
  constructor(private product:ProductService,private route:Router){}

ngOnInit(): void {
  this.product.currentcard().subscribe((result)=>{
    let price=0;
    this.cartData=result
    result.forEach((item)=>{
     if(item.quantity){
      price=price+ (+item.productprice* +item.quantity)
     }
    })
    this.totalprice=price+(price/10)+100-(price/10)
    console.warn(this.totalprice)
  })
}

orderNow(data:{email:string,address:string,contact:string}){
  let user=localStorage.getItem('usersign');
  let userid= user && JSON.parse(user).id;

  if(this.totalprice){
    let orderData:order={
      ...data,
      totalprice:this.totalprice,
      userid,
      id:undefined
    }
    this.cartData?.forEach((item)=>{
       setTimeout(()=>{
        item.id && this.product.deletecartitems(item.id)
       },700);
    })
    this.product.ordernow(orderData).subscribe((result)=>{
     if(result){
       this.ordermsg="Your Order has been Placed!!!"
       setTimeout(() => {
        this.route.navigate(['myorder']) 
        this.ordermsg=undefined
       },2000);
          }
    })
  }
 
}
}
