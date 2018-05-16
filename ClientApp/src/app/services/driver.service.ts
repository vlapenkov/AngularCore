import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Driver, SomeType } from '../driverslist/driverslist.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';






@Injectable()

export class DriverService {


  private path: string = 'api/drivers/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    //  'Authorization': 'my-auth-token'
    })
  };
  private _baseUrl: string = "";
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string)
  {
    console.log(baseUrl);
    this._baseUrl = baseUrl;
   
    
  }
  
  handleError(arg0: any): any {
    console.log('error ' + arg0)
  }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this._baseUrl + this.path , /*{ observe: "response" }*/);    
  }



  ///   
  // ≈сли водител€ нет, то возвращаетс€ Observable.of(null) и DriverRouteActivator редиректит на 404
  ///

  getOneDriver(id: number): Observable<Driver> {
    return this.http.get<Driver>(this._baseUrl + this.path + id).do(
      driver => {
        if (driver === null) return Observable.of(null)
        
  }).
      catch((err: HttpErrorResponse) => {
      
        console.log('Driver not found');
        return Observable.of(null);
      });
  }

  updateDriver(hero: Driver): Observable<Driver> {

  
    return this.http.put<Driver>(this._baseUrl + this.path + hero.id, JSON.stringify(hero) , this.httpOptions);
    
  }

 
}


