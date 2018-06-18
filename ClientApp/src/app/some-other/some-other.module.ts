import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterService } from '../services/counter.service';
import { CounterComponent } from '../counter/counter.component';
@NgModule({  
  imports: [
    CommonModule
  ],
 providers: [CounterService],
  declarations: [  CounterComponent ],
  exports: [CounterComponent] 
})
export class SomeOtherModule { }
