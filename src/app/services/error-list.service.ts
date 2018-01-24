import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Subject, Observable } from 'rxjs/Rx';
import { saveAs as importedSaveAs } from "file-saver";
const API_URL = environment.apiUrl;
@Injectable()
export class ErrorListService {
  errorList: Observable<Array<any>>;
  private errorListSubj: Subject<Array<any>>;

  constructor(private http: Http) {
    this.errorListSubj = new Subject<Array<any>>();
    this.errorList = this.errorListSubj.asObservable();
  }

  private headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
  }); // ... Set content type to JSON
  private options = new RequestOptions({ headers: this.headers }); // Create a request option

  getErrorList(): Observable<any> {
    return this.http.get(API_URL + '/api/errors', this.options)
      .map((res: Response) => {
        this.errorListSubj.next(res.json());
      })
      .catch((error: any) => {
        return Observable.throw(error.json().error || 'Server error')
      });

  }
  updateErroList(errorList) {
    return this.http.post(API_URL + '/api/errors', errorList)
      .subscribe((res: Response) => {
        this.errorListSubj.next(res.json());
      })

  }
}
