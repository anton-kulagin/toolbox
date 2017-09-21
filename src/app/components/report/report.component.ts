import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../services/report.service';
import { environment } from '../../../environments/environment';
import { NgbdModalComponent } from '../modal/modal/modal.component';
import { LinkGeneratorService } from '../../services/link-generator.service';
import { Optional } from "@angular/core";
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})



export class ReportComponent implements OnInit {
  data:JSON;
  testPairs:Array<Object>;
  filteredTestPairs:Array<Object>;
  filter:string ='all';
  isSummaryListCollapsed:Boolean=true;
  showPairStats:Boolean=false;
  BASE64_PNG_STUB:String = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';
  API_URL = environment.apiUrl;
  statVisibility:Boolean = false;
  constructor(
    private reportService: ReportService,
     private ngbdModalComponent:NgbdModalComponent,
     private linkGeneratorService:LinkGeneratorService
     ) { }
  getReport(): void {
    this.reportService
        .getReport()
        .then((resp) => {
          this.data = resp.json();
          this.testPairs = resp.json().tests;
          this.getTestPairsByFilter();
        
      });
  }

  receiveMessage($event) {
    console.log($event);
  }
  toogleSummary():void {
    this.isSummaryListCollapsed = !this.isSummaryListCollapsed;
  }
  getTestPairsByFilter():void  {
    // console.log(filter);
    this.filteredTestPairs = this.reportService.getTestPairs(this.filter);
    // console.log("--->"+this.filteredTestPairs);
    // console.log(this.testPairs);
  }

  onChangeObj(selectedFilter:string):void{
    console.log(event);
    this.filter= selectedFilter;
  }

  getReportImageURL(path:string):string{
    return this.linkGeneratorService.getReportImageURL(path);
  }
  
  openModal(img1,img2):void{
    this.ngbdModalComponent.open({'img1':img1,'img2':img2});
  }
  
  toogleStatVisibility():void{
    this.statVisibility = !this.statVisibility;
  }

  ngOnInit() {
    this.getReport();
  }


}
