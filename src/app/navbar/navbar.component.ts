import { Component } from '@angular/core';
import { AppStateService } from '../services/app-state.service';
import { LoadingService } from '../services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {




  constructor(public state: AppStateService, public ls: LoadingService, private router: Router) {
    // this.ls.isLoading$.subscribe({
    //   next : value =>{
    //     this.isLoading = value;
    //   }
    // });
  }
  actions: Array<any> = [
    { title: "Home", "route": "/admin/home", icon: "house" },
    { title: "Products", "route": "/admin/products", icon: "shop-window" },
    { title: "New Product", "route": "/admin/newProduct", icon: "plus" }
  ]
  currentAction: any;

  // public isLoading:boolean = false;




  setCurrentAction(action: any) {
    this.currentAction = action;
  }
  // imageURL=""
  // imageURL1="../assets/pexels-paco-álamo-14982761.jpg";
  // imageURL2="../assets/pexels-oleksandr-p-12944736.jpg"
  // username: string = '';

  // constructor(){
  //   this.imageURL=this.imageURL1;
  // }
  // onClick(){
  //   if(this.imageURL==this.imageURL1)
  //   this.imageURL=this.imageURL2;
  //   else
  //   this.imageURL=this.imageURL1;
  // }


  login() {
    this.router.navigateByUrl("/login");
  }
  logout() {
    this.state.authState={};
    this.router.navigateByUrl("/login");
  }
}
