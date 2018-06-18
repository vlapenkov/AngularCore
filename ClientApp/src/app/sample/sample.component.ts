import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'sample-comp',
  template: `<h2>In child The name is: {{o.name}}</h2> <h2> In child Some prop is {{someProp}} </h2>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleComponent implements OnInit {
// ��� ��� � ������������ ���������� �������� �������� o.name, � �� ��� ������ , �� ��������� ��� ��������� OnPush �� ����������
  @Input() o;

  // ����� ��������� ���������� ��-������, �.�. ��� �� ������ � ��������, � ��� ��������
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
