import { Component, OnInit } from '@angular/core';
import {} from '../services/seller.service';
import {Router} from '@angular/router'
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  menytype:string="default";
  sellername:string="";
  username:string="";
  searchresult:undefined|product[]
  addtocartcount=0
  

  constructor(private route: Router,private product : ProductService){}
  ngOnInit(): void {
    
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        if(localStorage.getItem('ssignup') && val.url.includes('seller')){
         
          this.menytype="seller"
          const b = localStorage.getItem('ssignup');
          if(localStorage.getItem('ssignup')){
            const userdata =b && JSON.parse(b)[0];
            this.sellername= userdata.name;
          }
        }
        else if(localStorage.getItem('usersign')){
             this.menytype="userdata";
             let c = localStorage.getItem('usersign');
             let user = c && JSON.parse(c);
             this.username= user.name
             this.product.getCartList(user.id)
        }
        else{
          
          this.menytype="default"
        }
      }
    })

    let x= localStorage.getItem('addtocart')
    if(x){
      this.addtocartcount= JSON.parse(x).length
    }

    this.product.cartData.subscribe((items)=>{
      this.addtocartcount = items.length
    })
    
    
  }

  logout(){
    localStorage.removeItem('ssignup')
    this.route.navigate([''])
  }

  userlogout(){
    localStorage.removeItem('usersign')
    this.route.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }
  
 searchproducts(query:KeyboardEvent){
   if(query){
    const element = query.target as HTMLInputElement
    this.product.searchproduct(element.value).subscribe((result)=>{
       if(result.length>5){
        result.length=5;
       }
       this.searchresult=result
    })
   }
 }

 hidesearch(){
  this.searchresult= undefined
 }

 searchquery(data:string){
   this.route.navigate([`search/${data}`])
 }

 redirecttodetails(id:string){
   this.route.navigate([`/details/${id}`])
 }

}
