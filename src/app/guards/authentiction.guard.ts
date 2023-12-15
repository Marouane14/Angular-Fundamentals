import { CanActivateFn, Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';
import { inject } from '@angular/core';


export const authentictionGuard: CanActivateFn = (route, state) => {
  //Injection de services
  const appState=inject(AppStateService);
  const router=inject(Router);
  //return(appState.authState.isAuthenticated==true);
  if(appState.authState.isAuthenticated==true){
    return true;
  }
  else{
    router.navigateByUrl("/login");
    return false;
  }
};
