import { Injectable, EventEmitter } from '@angular/core';
import * as PouchDB from 'pouchdb';
//var PouchDB = require('pouchdb');

import { Hero } from './hero';

@Injectable()
export class Backend {
    private isInstantiated: boolean;
    private database: any;
    private listener: EventEmitter<any> = new EventEmitter();

    private HEROES = [
      { _id: 11, name: 'Mr. Nice' },
      { _id: 12, name: 'Narco' },
      { _id: 13, name: 'Bombasto' },
      { _id: 14, name: 'Celeritas' },
      { _id: 15, name: 'Magneta' },
      { _id: 16, name: 'RubberMan' },
      { _id: 17, name: 'Dynama' },
      { _id: 18, name: 'Dr IQ' },
      { _id: 19, name: 'Magma' },
      { _id: 20, name: 'Tornado' }
    ];

    constructor(){
        if(!this.isInstantiated) {
            this.database = new PouchDB('my-db');
            this.database.changes({
                live: true,
                include_docs: true
            }).on('change', change => {
                this.listener.emit(change);
            });
            this.database.bulkDocs(this.HEROES);
            this.isInstantiated = true;
        }
    }

    getHeroes(): Promise<Hero[]> {
        return this.database.allDocs();
    }

    getHero(id: number): Promise<Hero> {
        return this.database.get(id);
    }

    save(hero: Hero): Promise<Hero> {
        return this.database.put(hero);
    }

    delete(hero: Hero): Promise<any> {
        return this.database.remove(hero);
    }
}
