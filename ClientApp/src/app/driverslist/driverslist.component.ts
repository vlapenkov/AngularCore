import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit, DoCheck } from '@angular/core';
import { DriverService } from '../services/driver.service';
//import { setTimeout } from 'timers';



@Component({
  selector: 'driverslist',
  templateUrl: './driverslist.component.html'
})
export class DriverslistComponent implements OnInit, DoCheck {
ngDoCheck(): void {

  console.log('some prop is changed');
}
  //ngOnInit(): void { }

  constructor(private driverService: DriverService) {
  }

  
  ngOnInit(): void {
    
    this.driverService.getDrivers().subscribe(data => {
      console.log(data);
      this.driverslist = data
    },
         err => console.error(err),
            () => console.log('done loading drivers')
    );

   setTimeout(() => { this.testDoCheck = true }, 10000);

}

  public driverslist: Driver[];
  p: number = 1;
  //sorting
  key: string = 'fio'; //set default
  reverse: boolean = false;

  testDoCheck = true;

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
