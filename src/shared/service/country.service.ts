import { Injectable } from '@angular/core';
import { REST_COUNTRIES_URL } from "../common/constants";
import { Observable } from "rxjs/Observable";
import { HttpService, HttpOptions } from "./common/http.service";

//const ROUTE_PARAMS: string = `${REST_COUNTRIES_URL}/`;
const ALL_COUNTRIES: string = `${REST_COUNTRIES_URL}/all`;
const FILTERED_COUNTRIES: string = `${REST_COUNTRIES_URL}/all?fields=`;

@Injectable()
export class CountryService {

    constructor(private httpService: HttpService){
    }

    getAllCountries(options?: HttpOptions): Observable<any>{
        return this.httpService.get(ALL_COUNTRIES, options);
    }

    getFilteredCountries(fields: string[], options?: HttpOptions): Observable<any>{
        let url: string;
        
        if(fields.length > 0){
            url = FILTERED_COUNTRIES;
            //CONCAT DOES NOT CHANGE THE TARGET STRING RATHER RETUNRS A NEW STRING OF THE RESULT OF BOTH, USE += INSTEAD
            //fields.forEach(f => url.concat(`${f};`));
            fields.forEach(f => url += `${f};`);
            //console.log(url);
        }
        //return this.httpService.get(url, options).map(response => response.json());
        //NO MORE NEED OF MAP SINCE HTTPCLIENT ABSTRACTS THE REPONSE OBJECT FROM US JUST GIVING AN OBJECT
        return this.httpService.get(url, options);
    }

}