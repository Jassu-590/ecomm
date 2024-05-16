import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {

  addproductmessage:string|undefined;

  constructor(private product: ProductService, private route:Router){}


  addtoproductlist(data:product){
      this.product.addproduct(data).subscribe((result)=>{
          
          if(result){
            this.addproductmessage="Product Added Successfully";
            setTimeout(()=>{
              this.route.navigate(['seller-home'])
            },2000)
            

          }

          setTimeout(()=>(this.addproductmessage= undefined
          ),3000)

      })
  }

}
