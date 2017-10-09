import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
  getReport(): any {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
    }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.get(API_URL + '/report', { headers: headers })
      .map((res: Response) => {
        if (res.status != 200) {
          this.reportSubj.next(
            JSON.parse('{"testSuite": "","tests": []}')
          );
          this.testPairSubj.next([])
        } else {
          this.reportSubj.next(res.json());
          this.testPairSubj.next(res.json().tests)
        }

      })
      .catch((error: any) => {
        return Observable.throw(error.json().error || 'Server error')
      });

  }
}
