import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  productdetails:undefined|product
  quantitycount:number=1
  removecart:boolean=false
  removecartid:product|undefined
  constructor(private activeroute:ActivatedRoute,private product:ProductService){

  }

  ngOnInit(): void {
    let data= this.activeroute.snapshot.paramMap.get('productid');
    
    data && this.product.productdetailsview(data).subscribe((result)=>{
    
     this.productdetails=result;

     let cardata= localStorage.getItem('addtocart');
     if(data && cardata){
      let items = JSON.parse(cardata);
      items= items.filter((item:product)=>data == item.id)
      if(items.length){
          this.removecart=true
      }else{
         this.removecart=false
      }
     }

     let user = localStorage.getItem('usersign');
     if(user){
      let userid = user && JSON.parse(user).id;
      this.product.getCartList(userid)
      this.product.cartData.subscribe((result)=>{
        let item = result.filter((item:product)=>data === item.productid )
        if(item.length){
          this.removecartid=item[0]
          this.removecart=true
        }
      })
     }
     
    })
  }


  quantiyincrement(){
    this.quantitycount+=1
  }

  quantitydecrement(id:string){
    if(this.quantitycount>1 && id==="minus"){
      this.quantitycount-=1
    }
  }

  AddToCart(){
    if(this.productdetails){
      this.productdetails.quantity= this.quantitycount
      if(!localStorage.getItem('usersign')){
        this.product.addtocartlocalstorage(this.productdetails);
        this.removecart=true
      }else{
        let user = localStorage.getItem('usersign')
        let userid = user && JSON.parse(user).id
        let cartdata:cart={
          ...this.productdetails,
          userid,
          productid:this.productdetails.id,
        }
        delete cartdata.id;
        this.product.useraddtocart(cartdata).subscribe((result)=>{
         if(result){
          this.product.getCartList(userid);
          this.removecart=true
         }
        })
      }
      
    }
  }

  removetocart(id:any){
    if(!localStorage.getItem('usersign')){
   this.product.removeitemfromcart(id);
   this.removecart=false
    }else{
      let user = localStorage.getItem('usersign')
      let userid = user && JSON.parse(user).id
      console.warn(this.removecartid);
      this.removecartid && this.product.userremovetocart(this.removecartid.id).subscribe((result)=>{
         if(result){
          this.product.getCartList(userid);
         }
      })
      this.removecart = false
    }
  }

}
