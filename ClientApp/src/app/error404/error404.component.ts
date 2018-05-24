import { Component } from '@angular/core'
import { OnInit, DoCheck } from '@angular/core';

// можно также создать ToastrService внес€ это объ€вление в него
declare let toastr;


@Component({
  template: `
    <h1 class="errorMessage">404'd</h1>
<app-counter-component [counter]="'5'" [test]="'test string'"></app-counter-component>
<app-counter-component></app-counter-component>
 <img src ="/assets/a52_sf.png" (click)=doToast()  /> `,
  styles: [`
    .errorMessage { 
      margin-top:150px; 
      font-size: 170px;
      text-align: center; 
    }`]
})
export class Error404Component implements OnInit {

ngOnInit(): void {


}
  constructor() {

  }

  doToast() {
    toastr.success('simple toast');
    
  }
}