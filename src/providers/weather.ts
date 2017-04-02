import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Weather provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Weather {
    public data: any;
    constructor(public http: Http) {
        console.log('Hello Weather Provider');
    }

    loadWeather(latitude, longitude) {
        return new Promise(resolve => {
            this.http.get('https://api.darksky.net/forecast/bfcd1e73c48ffab1966878a2cd64d347/' + latitude + ',' + longitude + '?lang=pl&units=auto')
                .map(res => res.json())
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                    console.log(this.data);
                });
        });
    }
}
