import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Subject, Observable } from 'rxjs/Rx';


const API_URL = environment.apiUrl;
@Injectable()
export class TestConfigService {
  testList: Observable<Array<any>>;
  testName: Observable<Array<any>>;
  private testNameSubj: Subject<Array<any>>;
  private testListSubj: Subject<Array<any>>;
  viewportsList: Observable<Array<any>>;
  private viewportsListSubj: Subject<Array<any>>;
  constructor(private http: Http) {
    this.testListSubj = new Subject<Array<any>>();
    this.testNameSubj = new Subject<Array<any>>();
    this.testList = this.testListSubj.asObservable();
    this.testName = this.testNameSubj.asObservable();
    this.viewportsListSubj = new Subject<Array<any>>();
    this.viewportsList = this.viewportsListSubj.asObservable();
  }
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
  }); // ... Set content type to JSON
  private options = new RequestOptions({ headers: this.headers }); // Create a request option

  getTestList(): Observable<any> {
    return this.http.get(API_URL + '/config', this.options)
      .map((res: Response) => {

        this.testListSubj.next(res.json().scenarios);
        this.testNameSubj.next(res.json().id);
        this.viewportsListSubj.next(res.json().viewports)

      })
      .catch((error: any) => {
        return Observable.throw(error.json().error || 'Server error')
      });

  }
  updateTest(testList) {
    return this.http.post(API_URL + '/config', testList)
      .subscribe((res: Response) => {

        this.testListSubj.next(res.json().scenarios);
        this.testNameSubj.next(res.json().id);
        this.viewportsListSubj.next(res.json().viewports)

      })

  }
  downloadConfig(){
    return this.http.get(API_URL + '/download')
      .subscribe((res: Response) => {

      })
  }
}
