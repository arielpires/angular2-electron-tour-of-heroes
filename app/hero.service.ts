import { Injectable } from '@angular/core';

import { Backend } from './pouchdb.backend';
import { Hero } from './hero';

interface BackendInterface {
  getHeroes(): Promise<Hero[]>
  getHero(id: string): Promise<Hero>
  save(hero: Hero): Promise<Hero>
  delete(hero: Hero): Promise<any>
}

@Injectable()
export class HeroService {



    backend: BackendInterface;

    constructor( backend: Backend ){
        this.backend = backend;
    }

}
