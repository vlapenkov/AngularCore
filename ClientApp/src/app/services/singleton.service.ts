import { Injectable } from '@angular/core';

/*
@Injectable({
  providedIn: 'root',
})
*/
@Injectable()
export class SingletonService {

  public counter: number = 1;
  constructor() {
    console.log('another instance of SingletonService');
  }

  public increment() {
   
    this.counter++;
  }

}
