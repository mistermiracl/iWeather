import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//IMPORT NEEDED TO ENABLE ALL OBSERVABLE OPERATORS LIKE MAP, MAPTO ETC, WHY IN THE MAIN.TS NO IDEA
import 'rxjs/Rx';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
