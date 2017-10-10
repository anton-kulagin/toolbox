import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Subject, Observable } from 'rxjs/Rx';


const API_URL = environment.apiUrl;
@Injectable()
export class TestConfigService {
  testList: Observable<Array<any>>;
  private testListSubj: Subject<Array<any>>;
  viewportsList: Observable<Array<any>>;
  private viewportsListSubj: Subject<Array<any>>;
  constructor(private http: Http) {
    this.testListSubj = new Subject<Array<any>>();
    this.testList = this.testListSubj.asObservable();
    this.viewportsListSubj = new Subject<Array<any>>();
    this.viewportsList = this.viewportsListSubj.asObservable();
  }
  getTestList(): Observable<any> {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
    }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.get(API_URL + '/config', { headers: headers })
      .map((res: Response) => {

        this.testListSubj.next(res.json().scenarios);
        this.viewportsListSubj.next(res.json().viewports)

      })
      .catch((error: any) => {
        return Observable.throw(error.json().error || 'Server error')
      });

  }
}
