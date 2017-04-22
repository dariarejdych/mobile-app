import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Weather} from '../../providers/weather';
import { Geolocation } from 'ionic-native';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [Weather]
})
export class HomePage {
    public weather: any;
    private completedLoadWeather = false;
    constructor(public navCtrl: NavController, public weatherService: Weather) {
        this.loadWeather();
    }
    loadWeather() {
        this.completedLoadWeather = false;
        Geolocation.getCurrentPosition().then((resp) => {
            console.log(resp.coords.latitude)
            console.log(resp.coords.longitude)
            this.weatherService.loadWeather(resp.coords.latitude, resp.coords.longitude).then(data => {
                this.weather = data;
                console.log(this.weather.latitude);
                this.completedLoadWeather = true;
                this.printTemperature();
                this.printWindSpeed();
            })
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }
    printTemperature() {
        if (this.completedLoadWeather) {
            document.getElementById('temp').textContent = "temperature: " + this.weather.currently.temperature;
        }

        console.log(this.weather.currently.temperature);

    }
    printWindSpeed() {
        if (this.completedLoadWeather) {
            document.getElementById('wind-speed').textContent = "wind speed " + this.weather.currently.windSpeed;
        }
        console.log(this.weather.currently.windSpeed);
    }

    printCloudCover() {
        if (this.completedLoadWeather) {
            document.getElementById('cloud-cover').textContent = "cloud cover " + this.weather.currently.cloudCover;
        }
        console.log(this.weather.currently.cloudCover);
    }
    printPressure () {
      if (this.completedLoadWeather) {
        document.getElementById('pressure').textContent = "pressure " + this.weather.currently.pressure;
      }
      console.log(this.weather.currently.pressure);
    }

  };
