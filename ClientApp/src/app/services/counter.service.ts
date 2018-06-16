import { Injectable } from '@angular/core';
import { SomeOtherModule } from '../some-other/some-other.module';

@Injectable()
export class CounterService {

  constructor() { console.log('Another instance of counter service') }
  //public currentCount = 0;
   static currentCount = 0;


  public incrementCounter() :number {
   return ++this.currentCount;
  }

  get currentCount() {
    console.log("getting value of counter");
    
    return CounterService.currentCount;
  }

  set currentCount(param: number) {

    CounterService.currentCount = param;
  }
}
