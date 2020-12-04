import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class SearchFile{
    constructor(private httpClient: HttpClient){}

    getSeatchFile(){
        return this.httpClient.get<any[]>('https://texty-3c9ff.firebaseio.com/files.json')
    }
}