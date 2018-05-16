import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Driver } from '../driverslist/driverslist.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DriverService } from '../services/driver.service';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'driver-form',
  templateUrl: './driver-form.component.html',
  //styleUrls: ['./driver-form.component.css']
})
export class DriverformComponent implements OnInit {

  model: Driver;

  driverForm: FormGroup;
  fioControl: FormControl;
  phoneControl: FormControl;
  hideRequired: FormControl;
  updated: boolean = false;
  _id: number;

  hr: boolean = false;
  selectedValueInSelect: string;

  favoriteSeason: string;

  seasons = [
    'Winter',
    'Spring',
    'Summer',
    'Autumn',
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private driverService: DriverService,
    private http: HttpClient
  ) {

  }

  ngOnInit() {
    this.favoriteSeason = 'Spring';
    this.selectedValueInSelect = 'option2';
  /*
    this.driverForm = this.fb.group({
      fio: ["", Validators.required],
      phone: ["", Validators.required],
    }); 
*/
    this.route.params.map(params => params['id']).
      //do(id=>this.id=+id).
      subscribe(id =>
        this.driverService.getOneDriver(id).subscribe(driverModel => {
          debugger;
          this.model = driverModel;
          console.log(driverModel);
          this.fioControl = new FormControl(driverModel.fio, [Validators.required, this.restrictedWords(['foo', 'bar'])], [this.badFioValidator.bind(this)]);
          this.phoneControl = new FormControl(driverModel.phone, [Validators.required]);
          
          
          this.driverForm = this.fb.group({
            fio: this.fioControl,
            phone: this.phoneControl,
            hideRequired: new FormControl(this.hr)
          });

          this._id = id;
        }

        ));

   
  }


  prepareSaveDriver(): Driver {
    const formModel = this.driverForm.value;
        
    
    const saveHero: Driver = {
      id: this.model.id,
      fio: formModel.fio,
      phone: formModel.phone      
    };
    return saveHero;
  }
              
  onSubmit() {
    let driver = this.prepareSaveDriver();
    this.driverService.updateDriver(driver).subscribe(result => {
      console.log(result)
      this.updated = true;
      this.router.navigate(['drivers']);

    });    

      /*
       * можно вернуть любую ошибку для ее отражения
    this.fioControl.setErrors({
      "notUnique": true
    });
    */
  }

  /*
  existingDateValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> => {

      return new Promise(resolve => {
        if (control.value =='bad result from server' ) 
        //resolve(null);
          resolve({ 'duplicate': { value: control.value } })
        else
          resolve(null);
      });
    }
  } */


  // badFioValidator - асинхронный отложенный валидатор который может вызывать удаленный сервис
  // если Fio = 'bad fio
  // можно так 
  //existingDateValidator(): AsyncValidatorFn {
  //return(control: AbstractControl): Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> => {
  /*
  badFioValidator() {
    return (control: AbstractControl):any => {

      return new Promise(resolve => {        

        setTimeout(() => {

          if (control.value === 'bad fio') resolve({ 'badFioValidator': { value: control.value } })
          else
            resolve(null);

        }, 3000);

        });
      
      }
    }
    */

  // если есть такой водитель, то ошибка валидации
  badFioValidator (control: AbstractControl): any {

    return  this.driverService.getOneDriver( -1/*this._id*/ ).map(driver => {
        return driver ? { 'badFioValidator': { value: control.value } } : null;
      });

    }
  


  //mobileValidator() { return (control: AbstractControl): any => { return this.service.mobileExists(control.value).map(data => return (data['status'] == 'ok') ? null : { mobileTaken: true } )); } }

  
  private restrictedWords(words) {
    return (control: FormControl) => {
      if (!words) return null;
      var invalidWords = words.map(w => control.value.includes(w) ? w : null).filter(w => w != null);
      console.log(invalidWords);
      return invalidWords && invalidWords.length > 0 ? { 'restrictedwords': invalidWords.join(',') } : null
      //  return control.value.includes('foo') ? {'restrictedwords':'foo'} :null;
    }
  }


  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      //let headers = new Headers();
      /** In Angular 5, including the header Content-Type can invalidate your request */
      
      //let options = new RequestOptions({ headers: headers });

      const headers = new HttpHeaders();      
      headers.set('Content-Type', 'multipart/form-data');
      headers.set('Accept', 'application/json');

      console.log("before post");
      this.http.post("/api/drivers/postfile", formData,{ headers: headers })
      //  .map(res => res.json())
     //   .catch(error => Observable.throw(error))
        .subscribe(
        data => console.log('success'),
        error => console.log(error)
        )
    }
  }



}