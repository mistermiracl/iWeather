//OPERATORS DEFINED IN THE main.ts
//import 'rxjs/add/operator/map'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class HttpService {

    constructor(private httpClient: HttpClient) {
    }

    get<T>(url: string, options?: HttpOptions): Observable<T> {
        if (options)
            return this.httpClient.get<T>(url, this.mapHttpOptions(options));
        return this.httpClient.get<T>(url);
    }

    post(url: string, body: any, options?: HttpOptions): Observable<any> {
        if (options)
            return this.httpClient.post(url, body, this.mapHttpOptions(options));
        return this.httpClient.post(url, body);
    }

    put(url: string, body: any, options?: HttpOptions): Observable<any> {
        if (options)
            return this.httpClient.put(url, body, this.mapHttpOptions(options));
        return this.httpClient.put(url, body);
    }

    delete(url: string, options: HttpOptions): Observable<any> {
        if (options)
            return this.httpClient.delete(url, this.mapHttpOptions(options));
        return this.httpClient.delete(url);
    }


    /**
     * @desc Map to options object since HttpClient does not accept overloads
     * @param options The HttpOptions object to map
     */
    private mapHttpOptions(options: HttpOptions): {} {
        return {
            headers: options.headers,
            observe: options.observe,
            params: options.params,
            reportProgress: options.reportProgress,
            responseType: options.responseType,
            withCredentials: options.withCredentials
        };
    }

}

/**
 * @class HttpOptions Options for http call
 */
export class HttpOptions {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    observe?: "body" | "response" | "events";
    params?: HttpParams | { [param: string]: string };
    reportProgress?: boolean;
    responseType: "json" | "blob" | "arraybuffer" | "document" | "text";
    withCredentials?: boolean;

    static get DEFAULT_HTTP_OPTIONS(): HttpOptions {
        return {
            headers: { },
            observe: "body",
            params: { },
            reportProgress: true,
            responseType: "json",
            withCredentials: false
            
        };
    }
}



