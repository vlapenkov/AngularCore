import { Router,ActivatedRouteSnapshot,CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { DriverService } from './driver.service';
import { Observable } from 'rxjs/Observable';
import { Driver } from '../driverslist/driverslist.component';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class DriverRouteActivator implements CanActivate {
  constructor(private driverService: DriverService, private router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> /*| Promise<boolean> | boolean */{


    return this.driverService.getOneDriver(route.params['id']).map(res => {
      debugger;
      if (res === null) {
        this.router.navigate(['/']);
        return false;
      }
      else
        return true;
    });


  }
}
