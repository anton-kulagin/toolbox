import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Rx';
import { ErrorListService } from '@serv/error-list.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.scss']
})
export class ErrorListComponent implements OnInit {

  private API_URL = environment.apiUrl;
  public errors;
  private showedError = "active";
  private subscription: any[]=[];
  constructor(
    private errorListService: ErrorListService
  ) { }

  getErrorList() {
    this.subscription.push(this.errorListService
      .getErrorList()
      .do(() => {
        //this.openModal();
      })
      .subscribe((resp) => { }))
  }
  removeError(index) {
    this.errors.splice(index, 1)
    this.errorListService.updateErroList(this.errors);
  }
  deactiveError(index) {
    this.errors[index].status = !this.errors[index].status
    this.errorListService.updateErroList(this.errors);
  }
  changeFilter(filter){
    this.showedError = filter;
  }
  isVisible(error) {
    if (this.showedError == 'all') {
      return true;
    } else if (this.showedError == 'unactive') {
      return !error.status
    } else {
      return error.status
    }
  }
  ngOnInit() {
    this.getErrorList();
    this.subscription.push(this.errorListService.errorList.subscribe((resp) => { this.errors = resp; }));
  }
  ngOnDestroy() {
    this.subscription.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
