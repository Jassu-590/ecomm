import { Component, OnInit } from '@angular/core';
import { login, product, usersignup,cart } from '../data-type';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit {

  loginmessage:string="";
  show:boolean=false
constructor(private user:UserService,private router:Router,private product:ProductService){}
 
ngOnInit(): void {
  this.user.userauthreload()
}
  signup(data:usersignup){
    
    this.user.usersignup(data).subscribe((result)=>{
      console.warn(result)
      if(result){
        localStorage.setItem('usersign',JSON.stringify(result));
        this.router.navigate(['/'])
      }
    })
  }

  login(data:login){
    this.user.userlogin(data);
    this.user.invaliduserauth.subscribe((result)=>{
      if(result){
        this.loginmessage="Pls Enter Valid Details"
      }else{
        setTimeout(() => {
          this.localcarttoremotecart();
        }, 300);
      }
    })
  }

  showlogin(){
    this.show=true
  }

  showsignup(){
    this.show=false
  }

  localcarttoremotecart(){
    let data = localStorage.getItem('addtocart')
    let user = localStorage.getItem('usersign')
    let userid = user && JSON.parse(user).id
    if(data){
      let cartDatalist:product[]=JSON.parse(data);
     
      
    

      cartDatalist.forEach((product:product,index)=>{
        let cartData:cart={
          ...product,
          userid,
          productid:product.id,
         
        };

        delete cartData.id;
        setTimeout(()=>{
          this.product.useraddtocart(cartData).subscribe((result)=>{
            if(result){
              console.warn('item added to db')
            }
          })
          if(cartDatalist.length === index+1){
            localStorage.removeItem('addtocart');
          }
        },500);
      })
    }

    setTimeout(()=>{
      this.product.getCartList(userid)
    },500);
  }


  
}
