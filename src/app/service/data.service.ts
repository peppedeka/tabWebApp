import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/zip';
import { Subject } from 'rxjs/Subject';

import { environment } from '../../environments/environment';

@Injectable()
export class DataService {
  apiUrl = 'http://linuxpps.org:8080/';
  options: HttpHeaders = new HttpHeaders;
  constructor(private _http: HttpClient) {
    this.options.set('Content-type', 'json');

   }

  getCoils(): Observable<any> {
    return this._http.get(this.apiUrl + environment.data.coils);
  }


  setCoilsRow(el: any): Observable<any> {
    const obj = JSON.stringify({ 'address': el.name, 'value': el.status });
    return this._http.post<any>(this.apiUrl + environment.data.coilsPost, obj, {'headers': this.options});
  }

  getDiscreteInputs(): Observable<any> {
    return this._http.get(this.apiUrl + environment.data.discreteInputs);
  }

  getHoldingsRegister(): Observable<any> {
    return this._http.get(this.apiUrl + environment.data.holdingRegister);
  }

  setHoldingsRegisterRow(el: any): Observable<any> {
    const obj = JSON.stringify({ 'address': el.name, 'value': <Number>el.status });
    const url = this.apiUrl + environment.data.holdingRegisterPost;
    return this._http.post(url, obj);
  }
  getInputRegister(): Observable<any> {
    return this._http.get(this.apiUrl + environment.data.inputRegister);
  }

}
