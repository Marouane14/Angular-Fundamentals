import { Product } from '../model/product.model';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {


  //L'injection de Router, pour utiliser navigateByUrl(``);
  constructor(private productService: ProductService, private router: Router, public state: AppStateService) {
    //this.http=http;
  }
  ngOnInit(): void {
    //this.products$=this.productService.getProducts();
    //console.log("*******Search of Initialisation*********")
    this.searchProducts();

  }
  searchProducts() {
    this.state.setProductState({
      status :"LOADING"
    });
    this.productService.searchProducts(
      this.state.productState.keyword,
      this.state.productState.currentPage,
      this.state.productState.pageSize)
      .subscribe(
        {
          next: (resp) => {
            let products = resp.body as Product[];
            let totalProducts: number = parseInt(resp.headers.get('x-total-count')!);
            let totalPages = Math.floor(totalProducts / this.state.productState.pageSize);
            if (totalProducts % this.state.productState.pageSize != 0) {
              ++totalPages;
            }
            this.state.setProductState({
              products: products,
              totalPages: totalPages,
              totalProducts: totalProducts,
              currentPage: 1,
              status: "LOADED"
            });
          },
          error: err => {
            this.state.setProductState({
              status :"ERROR",
              errorMessage:err
            })
          }
        })

  }
  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product)
      .subscribe({
        next: updatedProduct => {
          product.checked = !product.checked;
        },
        error: err => {
          console.log(err);
        }
      })

  }
  handleDelete(product: Product) {
    // confirm() => Pour afficher un message de confirmation
    if (confirm("Vous êtes sûre de supprimet ce Produit ?")) {
      this.productService.deleteProduct(product).subscribe({
        next: data => {
          //Pour utiliser ça il faut enlever Observable,
          //et rendre products une liste de products sans Observable


          //this.products=this.products.filter(p=>p.id!=product.id);
          //this.products$=this.productService.getProducts();

        },
        error: err => {
          console.log(err);
        }
      })
      //console.log("*******Search of Delete*********")
      this.searchProducts();
    }
  }
  //  searchProducts() {
  //    this.currentPage=1;
  //    this.totalPages=0;
  //    this.getProducts();
  //  }

  handleGoToPage(page: number) {
    this.state.productState.currentPage = page;
    this.searchProducts();
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`);

  }
}
