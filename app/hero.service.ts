import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {
    getHero(id: number): Promise<Hero> {
      return this.getHeroes()
                 .then(heroes => heroes.find(hero => hero.id === id));
    }

  getHeroes(): void {
    this.getHeroes().then(heroes => this.heroes = heroes);
  }
}

