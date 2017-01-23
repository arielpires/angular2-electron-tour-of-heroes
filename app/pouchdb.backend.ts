import { Injectable, EventEmitter } from '@angular/core';
//import * as PouchDB from 'pouchdb';
//var PouchDB = require('pouchdb');

import { Hero } from './hero';

@Injectable()
export class Backend {
    private isInstantiated: boolean;
    private database: any;
    private listener: EventEmitter<any> = new EventEmitter();

    private HEROES = [
      { _id: '11', name: 'Mr. Nice' },
      { _id: '12', name: 'Narco' },
      { _id: '13', name: 'Bombasto' },
      { _id: '14', name: 'Celeritas' },
      { _id: '15', name: 'Magneta' },
      { _id: '16', name: 'RubberMan' },
      { _id: '17', name: 'Dynama' },
      { _id: '18', name: 'Dr IQ' },
      { _id: '19', name: 'Magma' },
      { _id: '20', name: 'Tornado' }
    ];

    constructor(){
        if(!this.isInstantiated) {
            this.database = new PouchDB('my-db');
            //this.database.changes({
            //    live: true,
            //    include_docs: true
            //}).on('change', change => {
            //    this.listener.emit(change);
            //});
            this.database.bulkDocs(this.HEROES)
                .then(function (result){ console.log(result); return result;})
                .catch(this.handleError);
            console.log('Created db');
            this.isInstantiated = true;
        }
    }

    getHeroes(): Promise<Hero[]> {
        let heroes = this.database.allDocs()
            .then(response => response.rows)
            .catch(this.handleError);
        console.log(heroes);
        return heroes;
    }

    getHero(id: string): Promise<Hero> {
        let hero = this.database.get(id)
            .then(hero => hero)
            .catch(this.handleError);
        console.log(hero);
        return hero;
    }

    save(hero: Hero): Promise<Hero> {
        if (hero._id) {
              return this.put(hero);
        }
        return this.post(hero);
    }

    delete(hero: Hero): Promise<any> {
        console.log(hero);
        return this.database.remove(hero)
            .then(result => result)
            .catch(this.handleError);
    }

    private put(hero: Hero): Promise<Hero> {
        return this.database.put(hero)
            .then(hero => hero)
            .catch(this.handleError);
    }


    private post(hero: Hero): Promise<Hero> {
        return this.database.post(hero)
            .then(hero => hero)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
