import { SettingsPage } from '../settings/settings';
import { AboutPage } from '../about/about';
import { Component } from '@angular/core';
import { HomePage } from "../home/home";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    
    tabs = { 
        tab1: HomePage, 
        tab2: AboutPage, 
        tab3: SettingsPage 
    };

    tab1Root = HomePage;
    tab2Root = AboutPage;
    tab3Root = SettingsPage;

    constructor() {
        
    }
}