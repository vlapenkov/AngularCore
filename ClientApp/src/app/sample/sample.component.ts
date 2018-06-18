import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'sample-comp',
  template: `<h2>In child The name is: {{o.name}}</h2> <h2> In child Some prop is {{someProp}} </h2>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleComponent implements OnInit {
// так как в родительском компоненте меняется значение o.name, а не сам объект , то изменения при стратегии OnPush не происходят
  @Input() o;

  // здесь изменения происходят по-любому, т.к. это не объект а значение, и оно меняется
  @Input() someProp;
  private name;
  constructor(private cd: ChangeDetectorRef ) { }

  ngOnInit() {
    
  }

 
  ngDoCheck() {
    this.cd.markForCheck();
 
    if (this.name !== this.o.name) {
      this.cd.markForCheck();
 
    }
 
  }
 

}
