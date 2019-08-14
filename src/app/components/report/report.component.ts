import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { environment } from '../../../environments/environment';
import { NgbdModalComponent } from '../modal/modal/modal.component';
import { LinkGeneratorService } from '../../services/link-generator.service';
import { BackstopService } from '../../services/backstop.service';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { Report } from "../../interface/report/report";
import { TestPair } from "../../interface/report/test-pair";

import { TestProcessState } from '../../services/test-process-state.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})


export class ReportComponent implements OnInit {
  public report: Report;
  private testPairs: Array<TestPair>;
  private filteredTestPairs: Array<TestPair>;
  private filter: string = this.getLastFilter();
  private isSummaryListCollapsed: Boolean = true;
  private loading: Boolean = false;
  private API_URL = environment.apiUrl;
  public isTestsRunning: boolean;
  statVisibility: Boolean = false;
  constructor(
    private reportService: ReportService,
    private ngbdModalComponent: NgbdModalComponent,
    private linkGeneratorService: LinkGeneratorService,
    private backstopService: BackstopService,
    private testProcessState: TestProcessState
  ) { }
  setLocalStorageObjectItem(key, value) {
    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  
  getLocalStorageObjectItem(key) {
    var json = localStorage.getItem(key);
    if (json === undefined) {
      return undefined;
    }
    return JSON.parse(json);
  }
  getLastFilter():string {
    let storedValue = this.getLocalStorageObjectItem("selectedFilter")
    return storedValue? storedValue:"all"
  }
  getReport(preventClose: boolean = false): void {
    this.reportService
      .getReport()
      .do(() => {
        this.openModal();
      })
      .subscribe((resp) => {
        if (!preventClose) {
          this.closeModal();
        }

      })
  }

  receiveMessage($event) {
    console.log($event);
  }
  toogleSummary(): void {
    this.isSummaryListCollapsed = !this.isSummaryListCollapsed;
  }
  getTestPairsByFilter(): Array<TestPair> {
    return this.getTestPairs(this.filter);
  }



  onChangeFilter(selectedFilter: string): void {
    this.setLocalStorageObjectItem("selectedFilter",selectedFilter)
    this.filter = selectedFilter;
    this.filteredTestPairs = this.getTestPairsByFilter()
  }

  getReportImageURL(path: string): string {
    return this.linkGeneratorService.getReportImageURL(path);
  }

  openModal(): void {
    if (!this.loading) {
      this.loading = true;
      this.ngbdModalComponent.open(NgbdModalComponent);
    }

  }
  closeModal(): void {
    this.loading = false;
    this.ngbdModalComponent.close('End');
  }
  toogleStatVisibility(): void {
    this.statVisibility = !this.statVisibility;
  }

  backstopRun(command: string) {
    let servicePromise = this.backstopService.run(command),
      preventClose = command == 'approve' ? true : false;
    if (this.isTestsRunning) {
      return;
    }
    this.openModal();
    servicePromise
      .then((data) => {
        this.getReport(preventClose);
      })
    if (command == 'approve') {
      servicePromise.then(data => {
        this.openModal();
        return this.backstopService.run('test')
      })
        .then(() => {
          this.getReport();
        })
    }


  }
  getTestPairs(filter: string = 'all'): Array<TestPair> {
    return this.testPairs.filter((pair) => {
      let result = true;
      if (filter !== 'all') {
        result = pair['status'] == filter;
      }
      return result;
    });
  }

  convertDate(date:string):string{
    let dateObj = new Date(date);
    return `${dateObj.getDate()}/${dateObj.getMonth()+1}/${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
  }

  ngOnInit() {
    this.getReport();
    this.reportService.report.subscribe((resp) => { 
      this.report = resp; 
    });
    this.reportService.testPair.subscribe((resp) => {
      this.testPairs = resp;
      this.filteredTestPairs = this.getTestPairsByFilter();
    });
    this.isTestsRunning = this.testProcessState.runnningStateSubj.getValue();
    this.testProcessState.runnningStateSubj.subscribe((arg) => {
      if (this.isTestsRunning != arg) {
        this.getReport();
      }
      this.isTestsRunning = arg
    });
  }


}
