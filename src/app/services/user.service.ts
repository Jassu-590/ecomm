import { EventEmitter, Injectable } from '@angular/core';
import { login, signup, usersignup } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invaliduserauth= new EventEmitter<boolean>(false);

  constructor(private http:HttpClient,private route:Router) { }

  usersignup(data:usersignup){
      return this.http.post("http://localhost:3000/users",data)
  }

  userauthreload(){
    if(localStorage.getItem('usersign')){
       this.route.navigate([''])
    }
  }

  userlogin(data:login){
    this.http.get<signup[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result)=>{
     if(result && result.body?.length){
      this.invaliduserauth.emit(false)
      localStorage.setItem('usersign',JSON.stringify(result.body[0]));
      this.route.navigate(['/'])
     }else{
      this.invaliduserauth.emit(true)
     }
    })
  }
}
