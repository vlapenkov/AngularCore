import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Driver } from './../driverslist/driverslist.component';

import { EmitterService } from '../services/emitterservice';

@Component({
  selector: 'driverslist-item',
  templateUrl: './driverslistitem.component.html'
})
export class DriverslistitemComponent {
  @Input() driver: Driver;
  @Output() eventClick = new EventEmitter();


  

  private clickMe($e) {
    console.log($e);
 //   console.log(this.driver);
    this.eventClick.emit(this.driver);
    EmitterService.get("some_id").emit(this.driver.fio);
   // this.heroService.incrementCounter();

    
  }
  /*
  logSelectedHero() {
    console.log(this.hero.name);
    this.someProperty = "changed to" + this.hero.name;
  }*/
}
