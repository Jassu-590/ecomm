import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<product[]|[]>();

  constructor(private http: HttpClient) { }
  addproduct(data:product){
     return this.http.post("http://localhost:3000/product",data)
  }

  producttohome(){
    return this.http.get<product[]>("http://localhost:3000/product")
  }

  deleteproductbutton(data:string){
    return this.http.delete(`http://localhost:3000/product/${data}`)
  }

  updateproductlist(id:string){
    return this.http.get<product>(`http://localhost:3000/product/${id}`)
  }

  submitupdatedata(data:product){
    return this.http.put<product>(`http://localhost:3000/product/${data.id}`,data)
  }

  popularproduct(){
    return this.http.get<product[]>("http://localhost:3000/product?_limit=3")
  }

  trendyproducts(){
    return this.http.get<product[]>("http://localhost:3000/product?_limit=12")
  }

  searchproduct(query:string){
      return this.http.get<product[]>(`http://localhost:3000/product?productcategory=${query}`);
  }

  productdetailsview(id:string){
    return this.http.get<product>(`http://localhost:3000/product/${id}`)
  }

  addtocartlocalstorage(data:product){
    let cart=[]
    let localcart=localStorage.getItem('addtocart');
    if(!localcart){
      localStorage.setItem('addtocart',JSON.stringify([data]));
      this.cartData.emit([data])
    }
    else{
      cart=JSON.parse(localcart);
      cart.push(data)
      localStorage.setItem('addtocart',JSON.stringify(cart))
      this.cartData.emit(cart)
    }

   
  }

  removeitemfromcart(productid:string){
    let localcart=localStorage.getItem('addtocart');
    if(localcart){
      let items:product[]= JSON.parse(localcart);
      items = items.filter((item:product)=>productid!= item.id);
      localStorage.setItem('addtocart',JSON.stringify(items))
      this.cartData.emit(items);
    }
  }

  useraddtocart(productdata:cart){
    return this.http.post("http://localhost:3000/cart",productdata
      
    )
  }

  
  getCartList(userid:string){
    return this.http.get<product[]>(`http://localhost:3000/cart?userid=${userid}`,{observe:'response'}).subscribe((result)=>{
     if(result && result.body){
      this.cartData.emit(result.body);
     }
    })
  }

  userremovetocart(cartid:string){
    return this.http.delete(`http://localhost:3000/cart/${cartid}`)
      
  }

  currentcard(){
    let user = localStorage.getItem('usersign')
    let userid = user && JSON.parse(user).id
    return this.http.get<cart[]>(`http://localhost:3000/cart/?userid=${userid}`)
  }

  ordernow(data:order){
    return this.http.post('http://localhost:3000/orders',data)
  }

  orderlist(){
    let user = localStorage.getItem('usersign')
    let userid = user && JSON.parse(user).id
    return this.http.get<order[]>(`http://localhost:3000/orders?userid=${userid}`)
  }

  deletecartitems(cartid:string){
    return this.http.delete(`http://localhost:3000/cart/${cartid}`,{observe:'response'}).subscribe((result)=>{
     if(result){
      this.cartData.emit([])
     }
    })
  }

  cancelorder(orderid:string){
    return this.http.delete(`http://localhost:3000/orders/${orderid}`)
  }
}
