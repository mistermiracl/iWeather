import { Component } from '@angular/core';
import { NavController } from "ionic-angular";


@Component({
    templateUrl: 'about.html',
    selector: 'page-about'
})
export class AboutPage {
    
    constructor(public navCtrl: NavController){
    }
}