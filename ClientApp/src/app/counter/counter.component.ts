import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CounterService } from '../services/counter.service';


@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html',
  providers: [CounterService]
})
export class CounterComponent {
  
  @Input('counter')
  public currentCount?:number;

  @Input() test:string;

  constructor(private hService: CounterService) { }

  public incrementCounter() {
    if (!this.currentCount) this.currentCount = 1
   else
    this.currentCount++

  
  }
}
