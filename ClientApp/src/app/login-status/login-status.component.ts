import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { EmitterService } from '../services/emitterservice';
@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  _userName: string;
  constructor(private authService: AuthenticationService) {
    EmitterService.get("username_id").subscribe(data => {
      this._userName = data;            
    }
    );
  }

  ngOnInit() {
   this. _userName = this.authService.userName;
  }

  logout() {
    this.authService.logout();
  }

}
