import { CanActivateFn, Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';
import { inject } from '@angular/core';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const appState=inject(AppStateService);
  const router=inject(Router);
  if(appState.authState.roles.includes(route.data['requiredRoles']))
  {
    return true;
  }
  else{
    router.navigateByUrl("/admin/notauthorized")
    return false;
  }

};
