import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent implements OnInit {

  updateproduct:undefined|product
  updatemessage:string|undefined
  
constructor(private route:ActivatedRoute, private product1:ProductService,private router: Router){}

  ngOnInit(): void {
    let productid = this.route.snapshot.paramMap.get('id');
    
    productid &&this.product1.updateproductlist(productid).subscribe((result)=>{
        this.updateproduct= result
        
    })

  }

  updateproductlists(data:product){
    if(this.updateproduct){
      data.id= this.updateproduct.id
    this.product1.submitupdatedata(data).subscribe((result)=>{
      if(result){
        this.updatemessage="Product Updated Successfully";
        setTimeout(()=>{
          this.router.navigate(['seller-home'])
        },1000)
      }
    })
  }

  setTimeout(()=>{
    this.updatemessage=undefined
  },3000)
}
}
