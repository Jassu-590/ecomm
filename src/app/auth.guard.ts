import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SellerService } from './services/seller.service';

export const authGuard: CanActivateFn = (route, state) => {
  const a = inject(SellerService)

  if(localStorage.getItem('ssignup')){
    return true;
  }
  return  a.issellerloggedin;
};
