import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  private redirectToUrl: string ;
  private redirectToDefault: string = '/';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  private route: ActivatedRoute) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    this.route.queryParams.subscribe(params => {
      debugger;
      this.redirectToUrl = params['redirectToUrl'] || this.redirectToDefault;      
    });
  }

  

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(result => {
        if (result) {
         
          // login successful

          if (this.redirectToUrl !== this.redirectToDefault) this.router.navigateByUrl(this.redirectToUrl);
        else  this.router.navigateByUrl(this.redirectToDefault);

        } else {
          // login failed
          this.error = 'Username or password is incorrect';
          this.loading = false;
        }
      },
      
      error => {
        this.error = 'error';
        this.loading = false;
      }
    )
  }

  /*
  loginfake() {
    this.loading = true;
    this.authenticationService.loginfake(this.model.username, this.model.password)
      .subscribe(result => {
        console.log('result is:' + result);
        this.loading = false;
      },

      error => {
        this.error = 'error';
        this.loading = false;
      }
      )
  }*/
}
