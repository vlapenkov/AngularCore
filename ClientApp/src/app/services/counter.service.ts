import { Injectable } from '@angular/core';

@Injectable()
export class CounterService {

  constructor() { }
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
