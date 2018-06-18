import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { tap, map } from 'rxjs/operators';
import { EmitterService } from '../services/emitterservice';



interface ILoginResponse {
  token: string;  
}
export class LoginResponse implements ILoginResponse
{
  constructor(t: string) { this.token=t }
    public token: string;

}

@Injectable()
export class AuthenticationService {
  public token: string;
  public _loggedIn: boolean = false;
  public _userName: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //  'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
    // set token if saved in local storage  
  }

  loginfake(username: string, password: string): Observable<boolean> {    
    
   return Observable.of(new LoginResponse('123')).delay(1000).pipe(tap(val => console.log(`BEFORE MAP: ${val}`)), map(x => x.token==='1'));
   // return Observable.throw('asd')..delay(1000).pipe(tap(val => console.log(`BEFORE MAP: ${val}`)), map(x => x.token === '1'));
  }

  get userName():string {
    return this._userName;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<LoginResponse>('api/accounts/login', JSON.stringify({ username: username, password: password }), this.httpOptions)      
      .do(response => {
        // login successful if there's a jwt token in the response
        //  let token = response.json() && response.json().token;
        debugger;
        let token = response.token;
        if (token) {
          // set token property
          this.token = token;
          this._loggedIn = true;
          this._userName = username;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          EmitterService.get("username_id").emit(this._userName);
          localStorage.setItem('auth_token', token);
        } else {
          this._userName = null;
        }
      }).map(res => !!res.token)
      ;
  }

  logout() {
    localStorage.removeItem('auth_token');
    this._loggedIn = false;    
    this._userName = null;
    EmitterService.get("username_id").emit(null);
  }
  isLoggedIn() {
    return this._loggedIn;
  }
}