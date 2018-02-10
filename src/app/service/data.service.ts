import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/zip';
import { Subject } from 'rxjs/Subject';

import { environment } from '../../environments/environment';

@Injectable()
export class DataService {
  apiUrl = 'http://linuxpps.org:8080/';
  constructor(private _http: HttpClient) {}

  getCoils(): Observable<any> {
    return this._http.get(this.apiUrl + environment.data.coils);
  }

  getDiscreteInputs(): Observable<any> {
    return this._http.get(this.apiUrl + environment.data.discreteInputs);
  }

  getHoldingsRegister(): Observable<any> {
    return this._http.get(this.apiUrl + environment.data.holdingRegister);
  }

  getInputRegister(): Observable<any> {
    return this._http.get(this.apiUrl + environment.data.inputRegister);
  }

}
