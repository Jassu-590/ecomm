import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'
import {login, signup} from '../data-type'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  issellerloggedin = new BehaviorSubject<boolean>(false);
  isloginerror = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }
  sellersignin(data:signup){
   this.http.post('http://localhost:3000/seller',data,{ observe:'response'})
   .subscribe((result)=>{
    this.issellerloggedin.next(true);
    localStorage.setItem('ssignup',JSON.stringify(result.body))
    this.router.navigate(['seller-home']);
   });
  }

  reloadseller(){
    if(localStorage.getItem('ssignup')){
      this.issellerloggedin.next(true);
      this.router.navigate(['seller-home'])
    }
  }

  sellerlogin(datalogin:login){
   this.http.get(`http://localhost:3000/seller?email=${datalogin.email}&password=${datalogin.password}`,{ observe:'response'})
   .subscribe((result:any)=>{
      console.warn(result)
      if(result && result.body && result.body.length){
        console.warn("user logged in")
        localStorage.setItem('ssignup',JSON.stringify(result.body))
        this.router.navigate(['seller-home']);
      }
      else{
        console.warn("loggin failed");
        this.isloginerror.emit(true)
      }
   })
  }
}
