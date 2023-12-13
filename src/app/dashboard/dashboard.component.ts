import { Component } from '@angular/core';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  constructor( public state: AppStateService){}
  totalCheckedProducts() {
    let CheckedProducts= this.state.productState.products.filter((p:any)=>p.checked==true);
    return CheckedProducts.length;
  }
}
