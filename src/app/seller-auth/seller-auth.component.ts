import { Component, OnInit } from '@angular/core';
import {SellerService} from '../services/seller.service'
import {signup,login} from '../data-type'
import {Router} from '@angular/router'

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit {

  showlogin= false;
  authError:string = "";

  constructor(private seller: SellerService, private router:Router){}

  ngOnInit(): void {
    this.seller.reloadseller()
  }

  signup(data:signup){
    this.seller.sellersignin(data)
  }

  login(logindata:login){
      this.authError=""
      this.seller.sellerlogin(logindata);
      this.seller.isloginerror.subscribe((error)=>{
        if(error){
          this.authError="Email or Password is not correct"
        }
      })
  }

  openlogin(){
    this.showlogin= true;
  }

  opensignup(){
    this.showlogin= false;
  }

}
