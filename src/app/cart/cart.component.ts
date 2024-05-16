import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, pricesummary } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartData:cart[]|undefined

  pricesummary:pricesummary={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0,
  }
constructor(private product:ProductService,private route:Router){}

ngOnInit(): void {
 this.loaddetails()
}

checkoutpage(){
this.route.navigate(['/Checkout'])
}

loaddetails(){
  this.product.currentcard().subscribe((result)=>{
    this.cartData=result;
    let price=0;
    result.flatMap((item)=>{
      if(item.quantity){
        price = price+ (+item.productprice* +item.quantity)
      }
      
    });
    this.pricesummary.price=price;
    this.pricesummary.discount=price/10;
    this.pricesummary.tax=price/10;
    this.pricesummary.delivery=100;
    this.pricesummary.total=price+(price/10)+100-(price/10)

    if(!this.cartData.length){
      this.route.navigate(['/'])
    }
    })
}

removetocart(cartid:string|undefined){
  cartid && this.cartData&&this.product.userremovetocart(cartid).subscribe(()=>{
    this.loaddetails()
  })
}

} 
