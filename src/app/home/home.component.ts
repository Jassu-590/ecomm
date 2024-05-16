import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  
  popular_product:undefined|product[]
  trendy_product:undefined|product[]
  constructor(private product : ProductService){

  }

  ngOnInit(): void {
    this.product.popularproduct().subscribe((result)=>{
       
        this.popular_product=result
    })

    this.product.trendyproducts().subscribe((result)=>{
       this.trendy_product= result
    })
  }

}
