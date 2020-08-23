import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FactoryService {
    module: string;
    base = `${environment.apiUrl}/api`;

    constructor(private http: HttpClient) {
    }

    public setModule(module: string) {
        this.module = module;
    }

    public get(params: {} = {}) {
        Object.keys(params).forEach(key => {
            if (params[key] === '') {
                delete params[key];
            }
        });
        return this.http.get(this.resolveUrl(), {params}).toPromise();
    }

    public post(data: any, opts: any = {}) {
        return this.http.post(this.resolveUrl(), data).toPromise();
    }

    private resolveUrl(opts: any = {}) {
        const suffix = opts.hasOwnProperty('suffix') ? opts.suffix : this.module;
        const base = opts.hasOwnProperty('prefix') ? opts.prefix : this.base;
        return `${base}/${suffix}`;
    }
}
