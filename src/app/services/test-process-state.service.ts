import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';
import { RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
const API_URL = environment.apiUrl;
@Injectable()
export class TestProcessState {
  runnningState: boolean=false;
  public runnningStateSubj: BehaviorSubject<boolean>;
  constructor(private httpClient: HttpClient) {
    this.runnningStateSubj = new BehaviorSubject<boolean>(this.runnningState);
    //this.runnningState = this.runnningStateSubj.asObservable();
  }

  getState(): Observable<any> {
    return this.httpClient.get(API_URL + '/process-state')
      .map((res:any) => {
        this.runnningStateSubj.next(res.state);
      })
      .catch((error: any) => {
        return Observable.throw('TestProcessState Server error')
      });

  }

}