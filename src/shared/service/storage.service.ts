import { Injectable } from '@angular/core';
import { HttpService, HttpOptions } from './common/http.service';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Observable } from "rxjs/Rx";
import { ASSETS_CONFIG_URL, DATABASE_LOCATION, DATABASE_NAME } from '../common/constants';
import { Config } from "ionic-angular";

@Injectable()
export class StorageService {

    readonly DATABASE_ERROR: string = 'Database not set, cannot be null or undefined';
    readonly DATABASE_CREATED_KEY: string = 'database_created';

    private _sqlLiteDb: SQLiteObject;
    get sqlLiteDb(): SQLiteObject {
        if(!this._sqlLiteDb)
            throw new Error(this.DATABASE_ERROR);
        return this._sqlLiteDb;
    }

    constructor(private httpService: HttpService, private sqlite: SQLite, private config: Config){
    }

    private getSchemaSQL(options?: HttpOptions): Observable<string>{
        if(!options){
            options = HttpOptions.DEFAULT_HTTP_OPTIONS
            options.responseType = 'text';
        }
        return this.httpService.get<string>(`${ASSETS_CONFIG_URL}/schema.sql`, options);
    }

    private setDatabase(sqliteObj: SQLiteObject): void{
        if(sqliteObj)
            this._sqlLiteDb = sqliteObj;
        else
            throw new Error(this.DATABASE_ERROR);
    }

    private createSchema(): void{
        this.getSchemaSQL().subscribe(
                data => this.executeSQL(data)
                .then(value => {
                    console.log(value);
                    this.config.set('', this.DATABASE_CREATED_KEY, 'true');
                })
                .catch(error => console.log(error)),
                error => console.log(error)
            );
    }

    createDatabase(datbaseName?: string, databaseLocation?: string): Promise<boolean>{
        return this.sqlite.create({
            name: DATABASE_NAME,
            location: DATABASE_LOCATION
        }).then(sqliteObj => {
            this.setDatabase(sqliteObj);
            if(!this.config.get(this.DATABASE_CREATED_KEY))
                this.createSchema();
            return true;
        }).catch(error => {
            console.log(error); 
            return false;
        });
    }

    executeSQL(sql: string, params?: any): Promise<any>{
        if(this._sqlLiteDb)
            return this._sqlLiteDb.executeSql(sql, params);
        else
            throw new Error(this.DATABASE_ERROR)
    }

    executeBatch(statements: string[]): Promise<any>{
        if(this._sqlLiteDb)
            return this._sqlLiteDb.sqlBatch(statements);
        else
            throw new Error(this.DATABASE_ERROR);
    }

}













// var somebool = true;
// undefined
// function isTrue(value){ return new Promise((resolve, reject) => {if(value){ console.log('acepted');resolve(true);} else {console.log('rejected');reject(false);}}); }
// undefined
// isTrue(false).then((value) => alert(value)).catch((error) => console.log);
// VM425:1 rejected
// Promise {<resolved>: ƒ}__proto__: Promise[[PromiseStatus]]: "resolved"[[PromiseValue]]: ƒ log()
// isTrue(false).then((value) => alert(value)).catch((error) => console.log((error));
// VM628:1 Uncaught SyntaxError: missing ) after argument list
// isTrue(false).then((value) => alert(value)).catch((error) => console.log(error));
// VM425:1 rejected
// VM634:1 false
// Promise {<resolved>: undefined}__proto__: Promise[[PromiseStatus]]: "resolved"[[PromiseValue]]: undefined
// isTrue(true).then((value) => alert(value)).catch((error) => console.log(error));
// VM425:1 acepted
// Promise {<resolved>: undefined}