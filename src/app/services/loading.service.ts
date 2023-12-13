import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  //Subject est un type de Observable particulier qui peut etre lui meme un Observer
  //Creer un Subject
  public isLoading$=new Subject<boolean>();

  constructor() { }

  showLoadingSpinner():void{
    //next ici signifie l'envoie de True vers tous les composants qui ecoutent
    this.isLoading$.next(true);
  }

  hideLoadingSpinner():void{
    //next ici signifie l'envoie de False vers tous les composants qui ecoutent
    this.isLoading$.next(false);
  }
}
