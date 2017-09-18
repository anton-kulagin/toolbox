import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  data:JSON;
  testPairs:Array<Object>;
  constructor(private reportService: ReportService) { }
getReport(): void {
    this.reportService
        .getReport()
        .then((resp) => {
          this.data = resp.json();
          this.testPairs = resp.json().tests;
         // debugger;
        
      });
  }
  ngOnInit() {
        this.getReport();
  }

}
