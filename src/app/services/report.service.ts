import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';
import {Subject,Observable} from 'rxjs/Rx';
import {TestPair} from "../interface/report/test-pair";
import {Report} from "../interface/report/report";



const API_URL = environment.apiUrl;
@Injectable()
export class ReportService {
  report:Observable<Report>;
  testPair:Observable<Array<TestPair>>;
 // reportEvent: EventEmitter<any> = new EventEmitter();
  private reportSubj:Subject<Report>;
  private testPairSubj:Subject<Array<TestPair>>;
  constructor(private http: Http) {
    this.reportSubj = new Subject<Report>();
    this.testPairSubj = new Subject<Array<TestPair>>();
    this.report = this.reportSubj.asObservable();
    this.testPair = this.testPairSubj.asObservable();
   }
  
//  getReport(): Promise<any> {
 getReport(): Observable<Report> {
      let headers = new Headers({ 'Content-Type': 'application/json',
                          'Access-Control-Allow-Headers': 'X-Requested-With,content-type' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers }); // Create a request option

      return this.http.get(API_URL+'/report',{headers:headers})
              .map((res:Response) =>{
                //debugger;
                console.log(this.reportSubj)
                this.reportSubj.next(res.json());
                console.log(this.reportSubj)
                //debugger;
                this.testPairSubj.next(res.json().tests)
              })
              .catch((error:any) => {
                debugger;
                return Observable.throw(error.json().error || 'Server error')
              });
   
  }
  // getTestPairs(filter:string='all'):Array<TestPair>{
  //   return this.testPair.filter((pair)=>{
  //     let result=true;
  //     if (filter!=='all'){
  //       result = pair['status']==filter;
  //     }
  //     return result;
  //   });
  //  }



}
