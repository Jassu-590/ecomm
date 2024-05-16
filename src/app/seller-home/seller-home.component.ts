import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit{

  deletemessage:string|undefined;
    
  productlists:undefined|product[]
  constructor(private product:ProductService, private http :HttpClient){}
    ngOnInit(): void {
      this.pagerefresh()
    }

  deleteproduct(id:string){
     this.product.deleteproductbutton(id).subscribe((result)=>{
       if(result){
        this.deletemessage="Product Deleted successfully"
        this.pagerefresh()
       }
     })

    setTimeout(()=>{
       this.deletemessage=undefined
    },3000)
  }

  pagerefresh(){
    this.product.producttohome().subscribe((result)=>{
      this.productlists= result
 })
  }

 
}
