import { Injectable } from '@angular/core';

import { Backend } from './http.backend';
import { Hero } from './hero';

interface BackendInterface {
  getHeroes(): Promise<Hero[]>
  getHero(id: number): Promise<Hero>
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
