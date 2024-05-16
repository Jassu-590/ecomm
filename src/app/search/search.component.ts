import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
 
  searchresult:undefined|product[]
  constructor(private activeroute:ActivatedRoute,private product :ProductService){

  }
  ngOnInit(): void {
    let data = this.activeroute.snapshot.paramMap.get('query')
    data && this.product.searchproduct(data).subscribe((result)=>{
      this.searchresult=result
    })
  }
}
