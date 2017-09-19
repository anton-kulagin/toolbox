import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  data:JSON;
  testPairs:Array<Object>;
  filteredTestPairs:Array<Object>;
  isSummaryListCollapsed:Boolean=true;
  showPairStats:Boolean=false;
  BASE64_PNG_STUB:String = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';
  API_URL = environment.apiUrl;

  constructor(private reportService: ReportService) { }
getReport(): void {
    this.reportService
        .getReport()
        .then((resp) => {
          this.data = resp.json();
          this.testPairs = resp.json().tests;
          this.getTestPairsByFilter();
         // debugger;
        
      });
  }
  toogleSummary():void {
    this.isSummaryListCollapsed = !this.isSummaryListCollapsed;
  }
  getTestPairsByFilter(filter:string ='all'):void  {
    console.log(filter);
    this.filteredTestPairs = this.testPairs.filter((pair)=>{
      let result=true;
      if (filter!=='all'){
        result = pair['status']==filter;
      }
      return result;
    });
    console.log(this.filteredTestPairs);
    console.log(this.testPairs);
  }
  onChangeObj(event:Event):void{
    console.log(event);
  }
  getReportImageURL(path:string):string{
    return this.API_URL+path.slice(2).replace(/\\/g,'/');
  }

  ngOnInit() {
        this.getReport();
  }


}
