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
            this.database = new PouchDB('mydb');
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
        return this.database.allDocs({include_docs: true})
            .then(function (response){
                let heroes = [];

                for (var i = 0, len = response.rows.length; i < len; i++){
                    heroes.push(response.rows[i].doc);
                }

                return heroes;
            })
            .catch(this.handleError);
    }

    getHero(id: string): Promise<Hero> {
        return this.database.get(id)
            //.then(hero => hero)
            .then(function (result){ console.log(result); return result;})
            .catch(this.handleError);
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
        var database = this.database;
        var handleError = this.handleError;

        return this.getNewId()
            .then(function(id){
                hero._id = id;
                return database.put(hero)
                    .then(hero => hero)
                    .catch(handleError);
            })
            .catch(this.handleError);
    }

    private getNewId(): Promise<string> {
        return this.getHeroes()
            .then(function(heroes){
                let maxId = '0';
                for (var i = 0, len = heroes.length; i < len; i++){
                    if (Number(maxId) < Number(heroes[i]._id)){
                        maxId = heroes[i]._id;
                    }
                }
                let newId = String(Number(maxId) + 1);
                return newId;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
