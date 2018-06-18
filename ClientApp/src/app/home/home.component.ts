import { Component, Inject, ViewChild,ElementRef } from '@angular/core';
import { SingletonService } from '../services/singleton.service';
import { CounterService } from '../services/counter.service';
import { OnInit,Input } from '@angular/core';
//import { setTimeout } from 'timers';
import { ChangeDetectionStrategy } from '@angular/core';


declare let $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  //providers: [CounterService],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
@Input()
  private someProp = "";
  s1 = "";

  someObj = {id:10,name:'name value '}
  @ViewChild('linkToP') containerEl: ElementRef;
  counter=0;
  ngOnInit(): void {
    $(this.containerEl.nativeElement).css({ 'background': 'red' })
    this.containerEl.nativeElement.style.color = 'cyan';

    //   $("#myModal").modal();
    setTimeout(() => {
      this.s1 = "911";
    //    this.someProp = "filled after pause";
      // this.someObj.name = "name value changed";
    }, 3000);


}
  constructor(private ss: SingletonService,private _counterService : CounterService  ,  @Inject('SETTINGS') settings: any) {
    console.log(settings);
    //ss.increment();
  this.counter=  this._counterService.incrementCounter();
  }

  changeB() { this.someObj.name = "name value changed twice"; }
  increment() {
    //this.ss.counter++;
    this.counter=  this._counterService.incrementCounter();
  }

  ngDoCheck() {
    console.log('checked in home component');
  }
}
