import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { AppStateService } from './app-state.service';
import { LoadingService } from './loading.service';


//L'intercepteur est un service aussi
//Pour que cet intercepteur puisse fonctionner, il faut le déclarer
//dans app.module.ts dans la partie providers

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {


  //On peut injecter d'autres services dans l'intercepteur aussi
  constructor(private state: AppStateService, private ls: LoadingService) { }


  //request est la requete interceptée
  //Cet interceptor redéfinit la méthode de intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>
  //Il va retourner la requete à la fin
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //Indiquer que l'état de données en "LOADING"
    //1ère Méthode
    // this.state.setProductState({
    //   status: "LOADING"
    // });
    //2ème Méthode
    this.ls.showLoadingSpinner();
    //Récupérer la requete et la cloner dans req, puis ajouter headers
    let req = request.clone({
      headers: request.headers.set('Authorization', 'Bearer JWT')
    });
    //Retourner la requete copie puis l'envoyer vers le serveur
    return next.handle(req).pipe(
      finalize(() => {
        //1ère méthode
        // this.state.setProductState({
        //   status: "LOADED"
        // });
        //2ème méthode
        this.ls.hideLoadingSpinner();
      })
    );
  }
}
