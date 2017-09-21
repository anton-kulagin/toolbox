import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';
const API_URL = environment.apiUrl;
@Injectable()
export class ReportService {
  report:any
  constructor(private http: Http) { }
  
  getReport(): Promise<any> {
     let headers = new Headers();
      headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); 
      return this.http.get(API_URL+'/reports',{headers:headers})
             .toPromise()
             .then((data)=>{
               this.report=data.json();
               return data;
            })
   
  }
  getTestPairs(filter:string='all'):Array<Object>{
    return this.report.tests.filter((pair)=>{
      let result=true;
      if (filter!=='all'){
        result = pair['status']==filter;
      }
      return result;
    });
  }
}
