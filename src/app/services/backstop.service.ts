import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

const API_URL = environment.apiUrl;

@Injectable()
export class BackstopService {

  constructor(private http: Http) { }

  run(command:string='',filter:string=''):Promise<any>{
    let headers = new Headers();
      headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
      return this.http
              .get(API_URL+`/service?method=${command}&filter=${filter}`,{headers:headers})
              .toPromise()
  }
}
