import { Component } from '@angular/core';

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
  lastDetectionDiscreteInputs: String = '';
  dataSourceDiscreteInputs: Element[] = [];
  lastDetectionHoldingsRegister: String = '';
  dataSourceHoldingsRegister: Element[] = [];
  lastDetectionInputRegister: String = '';
  dataSourceInputRegister: Element[] = [];
  displayedColumns = ['name', 'status'];
  constructor(private _dataService: DataService) {

    this._dataService.getCoils().subscribe((res) => {
      this.lastDetectionCoils = res.date_time;
      const keys: string[] = Object.keys(res.value);
      keys.forEach((key) => {
        const el: Element = { name: key, status: res.value[key] };
        this.dataSourceCoils.push(el);
      });
    });

    this._dataService.getDiscreteInputs().subscribe((res) => {
      this.lastDetectionDiscreteInputs = res.date_time;
      const keys: string[] = Object.keys(res.value);
      keys.forEach((key) => {
        const el: Element = { name: key, status: res.value[key] };
        this.dataSourceDiscreteInputs.push(el);
      });
    });

    this._dataService.getHoldingsRegister().subscribe((res) => {
      console.log(res);
      this.lastDetectionHoldingsRegister = res.date_time;
      const keys: string[] = Object.keys(res.value);
      keys.forEach((key) => {
        const el: Element = { name: key, status: res.value[key] };
        this.dataSourceHoldingsRegister.push(el);
      });
    });

    this._dataService.getInputRegister().subscribe((res) => {
      console.log(res);
      this.lastDetectionInputRegister = res.date_time;
      const keys: string[] = Object.keys(res.value);
      keys.forEach((key) => {
        const el: Element = { name: key, status: res.value[key] };
        this.dataSourceInputRegister.push(el);
      });
    });
  }
}
