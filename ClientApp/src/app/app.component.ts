import { Component } from '@angular/core';
import { HeroService } from './services/hero.service';
import { EmitterService } from './services/emitterservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HeroService]
})
export class AppComponent {

 // EmitterService.get("some_id").subscribe(data => console.log("some_id channel: ", data));
  title = 'app';
  constructor(private heroService: HeroService) {
    EmitterService.get("some_id").subscribe(data => console.log("some_id channel: ", data));
  }

//  public getCounter() { return this.heroService.currentCount };

}
