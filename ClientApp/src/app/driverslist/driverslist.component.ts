import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit, DoCheck } from '@angular/core';
import { DriverService } from '../services/driver.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';



@Component({
  selector: 'driverslist',
  templateUrl: './driverslist.component.html'
})
export class DriverslistComponent implements OnInit, DoCheck {

  public driverslist: Driver[];
  driverslist$: Observable<Driver[]>;
  p: number = 1;
  //sorting
  key: string = 'fio'; //set default
  reverse: boolean = false;

  testDoCheck = true;
  
ngDoCheck(): void {

  console.log('some prop is changed');
}
  //ngOnInit(): void { }

  constructor(private driverService: DriverService) {
  }

  
  ngOnInit(): void {

  // если ошибка перехвачена в червисе, то здесь не выполняется, а driverslist$=Observable.of<Driver[]>() из сервиса
    this.driverslist$ = this.driverService.getDrivers().catch(e => {
      debugger;
      console.log('error on get drivers in component :'+ e.description);
      //return Observable.of<Driver[]>()
      return Observable.empty<Driver[]>()
    }
);
  /*
    this.driverService.getDrivers().subscribe(data => {
      console.log(data);
      this.driverslist = data
    },
      err => {
        console.error(err), console.log('Caught in component');
      },
            () => console.log('done loading drivers')
    ); */

   setTimeout(() => { this.testDoCheck = true }, 10000);

}

  

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

 /*
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Driver[]>(baseUrl + 'api/drivers/').subscribe(result => {
      this.driverslist = result;
    }, error => console.error(error));
  } 
 */

  handleEventClicked(data) {
 
    console.log('received', data);
  }
}

export interface Driver {
  id: number;
  fio: string;
  phone: string;  
}

export interface SomeType {
 
}
