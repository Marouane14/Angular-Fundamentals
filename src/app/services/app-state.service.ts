import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  public productState:any={
    keyword : "",
    products : [],
    totalPages : 1,
    pageSize : 3,
    currentPage : 1,
    totalProducts:0,
    status:"",
    errorMessage:""
  }

  constructor() { }

  public setProductState(state:any):void{
    this.productState={...this.productState, ...state};
  }

}
