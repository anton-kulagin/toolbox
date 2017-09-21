import { Component, OnInit, Input, OnChanges, SimpleChanges   } from '@angular/core';
import { ReportService  } from '../../../../services/report.service';
import { LinkGeneratorService } from '../../../../services/link-generator.service';

@Component({
  selector: 'ngbd-accordion-basic',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {
  filteredTestPairs:any
  JSON = JSON;
  @Input() filter:string
  @Input() statVisibility:boolean
  constructor(
    private reportService:ReportService,
    private linkGeneratorService:LinkGeneratorService
    ) { }

  ngOnInit() {
    //this.filteredTestPairs = this.reportService.getTestPairs(this.filter);
    this.updateFilteredTestPair();
    console.log(this.filter);
  }
  getReportImageURL(url:string):string{
    return this.linkGeneratorService.getReportImageURL(url);
  }
  private updateFilteredTestPair(filter:string="all"):void{
    this.filteredTestPairs = this.reportService.getTestPairs(this.filter);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.filter){
      this.filter = changes.filter.currentValue
      this.updateFilteredTestPair(this.filter);
      
    }
    if (changes.statVisibility){
      this.statVisibility = changes.statVisibility.currentValue
    }
  }
    
}
