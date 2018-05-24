import { Component, Inject } from '@angular/core';
import { SingletonService } from '../services/singleton.service';
import { OnInit } from '@angular/core';
declare let $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
ngOnInit(): void {
  //$(function () {
    $("#myModal").modal();
 // })();


}
  constructor(private ss: SingletonService,  @Inject('SETTINGS') settings: any) {
    console.log(settings);
    ss.increment();
  }

}
