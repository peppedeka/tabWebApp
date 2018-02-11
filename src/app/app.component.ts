import { Component } from '@angular/core';

import {MatSnackBar} from '@angular/material';

import { DataService } from './service/data.service';

export interface Element {
  name: string;
  status: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  dataSourceCoils: Element[] = [];
  lastDetectionCoils: String = '';
  versionCoils: String = '';

  dataSourceDiscreteInputs: Element[] = [];
  lastDetectionDiscreteInputs: String = '';
  versionDiscreteInputs: String = '';

  dataSourceHoldingsRegister: Element[] = [];
  lastDetectionHoldingsRegister: String = '';
  versionHoldingsRegister: String = '';

  dataSourceInputRegister: Element[] = [];
  lastDetectionInputRegister: String = '';
  versionInputRegister: String = '';

  displayedColumns = ['name', 'status'];

  mobile: Boolean = false;
  message: String = '';

  constructor(private _dataService: DataService, public snackBar: MatSnackBar) {

    this.detectmob();

    this._dataService.getCoils().subscribe((res) => {
      this.lastDetectionCoils = res.date_time;
      this.versionCoils = res.version;

      const keys: string[] = Object.keys(res.value);
      keys.forEach((key) => {
        const el: Element = { name: key, status: res.value[key] };
        this.dataSourceCoils.push(el);
      });
    });

    this._dataService.getDiscreteInputs().subscribe((res) => {
      this.lastDetectionDiscreteInputs = res.date_time;
      this.versionDiscreteInputs = res.version;

      const keys: string[] = Object.keys(res.value);
      keys.forEach((key) => {
        const el: Element = { name: key, status: res.value[key] };
        this.dataSourceDiscreteInputs.push(el);
      });
    });

    this._dataService.getHoldingsRegister().subscribe((res) => {
      this.lastDetectionHoldingsRegister = res.date_time;
      this.versionHoldingsRegister = res.version;

      for (let i = 0; i < res.address.length; i++) {
        const el: Element = { name: res.address[i], status: res.value[i] };
        this.dataSourceHoldingsRegister.push(el);
      }

    });

    this._dataService.getInputRegister().subscribe((res) => {
      this.lastDetectionInputRegister = res.date_time;
      this.versionInputRegister = res.version;

      for (let i = 0; i < res.address.length; i++) {
        const el: Element = { name: res.address[i], status: res.value[i] };
        this.dataSourceInputRegister.push(el);
      }
    });
  }

  detectmob() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      this.mobile = true;
    }
  }

  saveHoldingsRegister(row: Element, value: any) {
    row.status = value.value;
    const self = this;
    this._dataService.setHoldingsRegisterRow(row)
    .subscribe(
      (res) => {
        this.snackBar.open('saved', 'address ' + row.name, {
          duration: 2000,
        });
      },
      (err) => {
        this.snackBar.open('error', err.message, {
          duration: 2000,
        });
      }
    );
  }
}
