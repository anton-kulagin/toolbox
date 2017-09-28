import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReportService } from '../../../../services/report.service';
import { LinkGeneratorService } from '../../../../services/link-generator.service';
import { BackstopService } from '../../../../services/backstop.service';

import { NgbdModalComponent } from '../../../modal/modal/modal.component';

@Component({
  selector: 'ngbd-accordion-basic',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  @Input() filteredTestPairs: any
  JSON = JSON;
  @Input() filter: string
  @Input() statVisibility: boolean
  loading: boolean = false
  constructor(
    private reportService: ReportService,
    private ngbdModalComponent: NgbdModalComponent,
    private linkGeneratorService: LinkGeneratorService,
    private backstopService: BackstopService
  ) {

  }

  ngOnInit() {
    //debugger;
    //console.log(this.filteredTestPairs)
    //this.filteredTestPairs = this.reportService.getTestPairs(this.filter);
    // debugger;
    // this.updateFilteredTestPair();
    //console.log(this.filter);
    //this.reportService.getReport()
    //.subscribe(resp=>{debugger;})

    //this.reportService.testPair.subscribe((resp) => { this.testPairs = resp; });
    //this.reportService.report.subscribe((resp) => { this.filteredTestPairs = resp; });

  }

  getReportImageURL(url: string): string {
    return this.linkGeneratorService.getReportImageURL(url);
  }
  private updateFilteredTestPair(filter: string = "all"): void {
    //this.filteredTestPairs = []
    //this.reportService.getTestPairs(this.filter);
  }
  openModalCompare(data: Object): void {
    this.ngbdModalComponent.open(NgbdModalComponent, data);
  }
  openModalLoading(): void {
    if (!this.loading) {
      this.loading = true;
      this.ngbdModalComponent.open(NgbdModalComponent);
    }
  }
  openModal(imgLeft?, imgRight?): void {
    if (imgLeft && imgRight) {
      let data = {
        imgLeft: this.getReportImageURL(imgLeft),
        imgRight: this.getReportImageURL(imgRight)
      }
      this.openModalCompare(data);
    } else {
      this.openModalLoading();
    }
    //if (!this.loading){
    //  this.loading=true;
    //  this.ngbdModalComponent.open(NgbdModalComponent,
    //    {
    //      imgLeft:this.getReportImageURL(imgLeft),
    //      imgRight:this.getReportImageURL(imgRight)
    //    }
    //  );
    //  this.ngbdModalComponent.open(NgbdModalComponent);
    //}

  }
  closeModal(): void {
    this.loading = false;
    this.ngbdModalComponent.close('End');
  }
  approveTestPair(testPair) {
    let filter = testPair.pair.label;
    // debugger;
    this.openModal();
    this.backstopService.run('approve', filter)
      .then(data => {
        debugger;
        return this.backstopService.run('test', filter)
      })
      .then(() => {
        debugger;
        return this.reportService.getReport()
          .subscribe(() => {
            this.closeModal();
            console.info('Refetching data after approving')
          });
      })

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filter) {
      this.filter = changes.filter.currentValue
      //this.updateFilteredTestPair(this.filter);

    }
    if (changes.statVisibility) {
      this.statVisibility = changes.statVisibility.currentValue
    }
    if (changes.filteredTestPairs) {
      this.filteredTestPairs = changes.filteredTestPairs.currentValue
    }
  }

}
