import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ParamsService {
    params: any = {};

    constructor() {
    }

    setParams(object) {
        this.params = object;
    }

    getParams() {
        return this.params;
    }

    clearParams() {
        this.params = null;
    }
}
