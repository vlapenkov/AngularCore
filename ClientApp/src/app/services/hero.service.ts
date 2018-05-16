import { Injectable } from '@angular/core';

@Injectable()
export class HeroService {

  constructor() { }
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
