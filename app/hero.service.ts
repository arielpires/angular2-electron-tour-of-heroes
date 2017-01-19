import { Injectable } from '@angular/core';

import { Backend } from './http.backend';
import { Hero } from './hero';

@Injectable()
export class HeroService {

    backend: Backend;

    constructor( backend: Backend ){
        this.backend = backend;
    }

}
