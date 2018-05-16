import { Component } from '@angular/core';
import { EmitterService } from '../services/emitterservice';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  lastMessage: string="";

  constructor() {
    EmitterService.get("some_id").subscribe(data => {
      console.log("some_id channel from NavMenuComponent: ", data);
      this.lastMessage = data;
    }
    );
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
