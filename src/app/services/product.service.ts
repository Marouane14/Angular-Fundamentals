import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private host:string="http://localhost:8089";

  constructor(private http:HttpClient ) {}

  public searchProducts(keyword : String = "", page : number=1, size : number=3){
    return this.http.get(`${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe:'response'});
  }
  public checkProduct(product:Product):Observable<Product>{
    return this.http.patch<Product>(`${this.host}/products/${product.id}`
    ,{checked:!product.checked});
  }
  public deleteProduct(product:Product):Observable<Product>{
    return this.http.delete<Product>(`${this.host}/products/${product.id}`);
  }
  public saveProduct(product: Product) {
    return this.http.post<Product>(`${this.host}/products`
    ,product);
  }
  // public searchProducts(keyword:String, page: number, size : number){
  //   return this.http.get<Array<Product>>(`http://localhost:8089/products?name_like=${keyword}&_page=${page}&_limit=${size}`);
  // }

  updateProduct(product : Product) {
    return this.http.put<Product>(`${this.host}/products/${product.id}`,product);
  }
  getProductById(productID: number) {
    return this.http.get<Product>(`${this.host}/products/${productID}`);
  }
}
