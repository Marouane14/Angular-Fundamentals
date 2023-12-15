import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppStateService } from './app-state.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  athenticateUser(user: any) {
    throw new Error('Method not implemented.');
  }

  private host:string="http://localhost:8089/users";
  constructor(private http:HttpClient,private appState:AppStateService) { }

  async login(username:string,password:string){
    let user:any = await firstValueFrom(this.http.get(`${this.host}/`+username));
    //cette partie ne se fait jamais dans le front-end car on ne reçoit jamais
    //le mot de passe, ce travail se fait normalement dans le back-end, on
    //reçoit juste le Jwt et après on décode pour récupérer les données
    //qu'il contient

    //btoa() sert à encoder
    //atob() sert à décoder
    if(password == atob(user.password)){
      let decodedJwt:any=jwtDecode(user.token);
      console.log(decodedJwt.sub);
      this.appState.setAuthState({
        //isAuthenticated:decodedJwt.true, //ERREUR on n'a pas attribut true dans payload du Jwt
        isAuthenticated:true,
        username:decodedJwt.sub,
        roles:decodedJwt.roles,
        token:decodedJwt.token
      });
      return Promise.resolve(true);
    }else{
      return Promise.reject("Bad Credentials");
    }
  }

}
