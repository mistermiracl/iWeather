import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CountryService } from "../../shared/service/country.service";
import { Country } from "../../shared/models/country_model";
import { StorageService } from "../../shared/service/storage.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //USE OBJECT KEY TO RETRIEVE THE PROPERTY NAMES OF TARGET OBJECT, WHICH IN THIS CASE WORK AS THE API CALL PARAMS
  readonly countryServiceParams: string[];

  constructor(public navCtrl: NavController, private countryService: CountryService, private storageService: StorageService) {

    //WE CANT GET THE OBJECT PROPERTY NAMES SINCE THEY MUST BE INITIALIZED SO THAT IS COMPILED TO EQUIVALENT JAVASCRIPT
    //HARDCODE THEM INSTEAD
    //this.countryServiceParams = Object.getOwnPropertyNames(new Country("", "", "", [2, 2], ""));
    this.countryServiceParams = ["name", "capital", "region", "latlng", "flag"];

    //console.log(this.countryServiceParams);
    this.countryService.getFilteredCountries(this.countryServiceParams).subscribe(
      data => console.log(data),
      error => console.log(error)
    );

    this.storageService.getSQL().subscribe(
      data => console.log(data),
      error => console.log(error)
    );


  }

}
