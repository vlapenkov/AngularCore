import { Component } from '@angular/core';
import { HeroService } from '../services/hero.service';


@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html',
  providers: [HeroService]
})
export class CounterComponent {
  public currentCount = 0;


  constructor(private hService: HeroService) { }

  public incrementCounter() {
     this.hService.incrementCounter();
    this.currentCount = this.hService.currentCount;

    //this.currentCount++;
  }
}
