export interface signup{
    name:string;
    email:string;
    password:string;
}

export interface login{
    email:string;
    password:string;
}

export interface product{
    productname:string;
    productprice:number;
    productcolor:string;
    productcategory:string;
    producturl:string;
    description:string;
    id:string;
    quantity:undefined|number
    productid:undefined|string
}

export interface usersignup{
    name:string;
    email:string;
    password:string;

}

export interface cart{
    productname:string;
    productprice:number;
    productcolor:string;
    productcategory:string;
    producturl:string;
    description:string;
    id:string|undefined;
    quantity:undefined|number;
    userid:string;
    productid:string;
}

export interface pricesummary{
    price:number;
    discount:number;
    tax:number;
    delivery:number;
    total:number
}

export interface order{
    email:string;
    address:string;
    contact:string;
    totalprice:number;
    userid:string;
    id:string|undefined;
}