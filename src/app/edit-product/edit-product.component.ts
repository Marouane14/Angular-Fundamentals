import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{


  productID!:number;
  productFormGroup!:FormGroup;


  constructor(
    private ps : ProductService,
    private route : ActivatedRoute,
    private fb : FormBuilder
    ){}
  ngOnInit(): void {
    this.productID=this.route.snapshot.params['id'];
    this.ps.getProductById(this.productID).subscribe({
      next : (product) =>{
        this.productFormGroup=this.fb.group({
          id: product.id,
          name : product.name,
          price : product.price,
          checked : product.checked
        })
      }
    });
  }
  editProduct() {
    let product = this.productFormGroup.value;
    this.updateProduct(product);
  }
  updateProduct(product:Product) {
    this.ps.updateProduct(product).subscribe({
      next : data=>{
        alert(JSON.stringify(data));
      },
      error : err=>{
        console.log(err);
      }
    });
  }
}
