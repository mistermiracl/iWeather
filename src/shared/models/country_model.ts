export class Country {

    //REALLY BASIC INFO NEEDED FROM A COUNTRY SINCE THE API LEST US FILTER THE RESPONSE
    name: string;
    capital: string;
    region: string;
    //latlng: number[]; TO MATCH DATABASE SCHEMA DIVIDE INTO 2 PROPERTIES
    lat: number;
    lng: number;
    flag: string;
    
    // constructor(name: string, capital: string, region: string, latlng: number[], flag: string){
    //     this.name = name;
    //     this.capital = capital;
    //     this.region = region;
    //     this.latlng = latlng;
    //     this.flag = flag;
    // }

}

//INDEX SIGNATURES DEEP DIVE

//     constructor() {
        
//         this.select["hello"] = "2";
//         console.log(this.select["hello"]);
        
//     }

// interface someint{
//     [key: string]: string;
// }