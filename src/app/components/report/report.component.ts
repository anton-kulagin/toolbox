import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { environment } from '../../../environments/environment';
import { NgbdModalComponent } from '../modal/modal/modal.component';
import { LinkGeneratorService } from '../../services/link-generator.service';
import { BackstopService } from '../../services/backstop.service';
import { Optional } from "@angular/core";

import 'rxjs/add/operator/do';

import { Observable } from 'rxjs/Rx';
import { Report } from "../../interface/report/report";
import { TestPair } from "../../interface/report/test-pair";
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})



export class ReportComponent implements OnInit {
  report: Report;
  testPairs: Array<TestPair>;
  filteredTestPairs: Array<TestPair>;
  filter: string = 'all';
  isSummaryListCollapsed: Boolean = true;
  showPairStats: Boolean = false;
  loading: Boolean = false;
  BASE64_PNG_STUB: String = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';
  API_URL = environment.apiUrl;
  statVisibility: Boolean = false;
  constructor(
    private reportService: ReportService,
    private ngbdModalComponent: NgbdModalComponent,
    private linkGeneratorService: LinkGeneratorService,
    private backstopService: BackstopService
  ) {

  }


  getReport(preventClose: boolean = false): void {
    this.reportService
      .getReport()
      .do(() => {
        this.openModal();
      })
      .subscribe((resp) => {
        console.info('Report fetched')
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
    console.log(event);
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
    this.openModal();
    servicePromise
      .then((data) => {
        debugger;
        this.getReport(preventClose);
      })
    if (command == 'approve') {
      servicePromise.then(data => {
        debugger;
        this.openModal();
        return this.backstopService.run('test')
      })
        .then(() => {
          debugger;
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

  ngOnInit() {
    this.getReport();
    this.reportService.report.subscribe((resp) => { this.report = resp; });
    this.reportService.testPair.subscribe((resp) => {
      this.testPairs = resp;
      this.filteredTestPairs = this.getTestPairsByFilter();
    });
  }


}
