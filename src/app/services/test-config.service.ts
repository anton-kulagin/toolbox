import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { saveAs as importedSaveAs } from "file-saver";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';


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

  preSaveTestListFix(testList):any {
    testList.forEach(element => {
      element.delay = parseFloat(element.delay);
      element.hideSelectors = element.hideSelectors.split?  element.hideSelectors.split(',') : element.hideSelectors;
      element.removeSelectors = element.removeSelectors.split?  element.removeSelectors.split(',') : element.removeSelectors;
    });
    return testList;
  }
  
  getTestList(): Observable<any> {
    return this.http.get(API_URL + '/api/config', this.options)
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
    return this.http.post(API_URL + '/api/config', this.preSaveTestListFix(testList))
      .subscribe((res: Response) => {

        this.testListSubj.next(res.json().scenarios);
        this.testNameSubj.next(res.json().id);
        this.viewportsListSubj.next(res.json().viewports)

      })

  }
  downloadFile(data: Response) {
    debugger;
    var blob = new Blob([JSON.stringify(data.json(), null, 6)], { type: 'application/json' });
    importedSaveAs(blob, 'backstop.js');
  }
  downloadConfig() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
      'responseType': 'application/json'
    }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.get(API_URL + '/api/download', options)
      .subscribe(data => this.downloadFile(data)),//console.log(data),
      error => console.log("Error downloading the file."),
      () => console.info("OK");
  }
}
