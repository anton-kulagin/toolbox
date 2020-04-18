import { Component } from '@angular/core';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/toPromise';

const API_URL = environment.apiUrl;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'app';
  server = API_URL

}
