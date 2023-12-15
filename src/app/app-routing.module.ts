import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { authentictionGuard } from './guards/authentiction.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { authorizationGuard } from './guards/authorization.guard';

const routes: Routes = [
  {path : "",redirectTo :"login", pathMatch:'full'},
  {path : "login", component:LoginComponent},
  {path : "admin", component:AdminTemplateComponent,
    canActivate:[authentictionGuard],
    children:[
      {path : "products", component:ProductsComponent},
      {path : "newProduct", component:NewProductComponent, canActivate:[authorizationGuard],
        data : {requiredRoles : 'ADMIN'}},
      //Cette Route Contient un param "id"
      {path : "editProduct/:id", component:EditProductComponent, canActivate:[authorizationGuard],
        data : {requiredRoles : 'ADMIN'}},
      {path : "home", component: HomeComponent},
      {path : "notauthorized", component:NotAuthorizedComponent}
  ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
