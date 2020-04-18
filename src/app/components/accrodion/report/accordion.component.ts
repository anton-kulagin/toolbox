import { TestProcessState } from '@serv/test-process-state.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TestConfigService } from '@serv/test-config.service';
import { ReportService } from '@serv/report.service';
import { LinkGeneratorService } from '@serv/link-generator.service';
import { BackstopService } from '@serv/backstop.service';
import { NgbdModalComponent } from '../../modal/modal/modal.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'ngbd-accordion-basic',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {
  @Input() filteredTestPairs: any
  @Input() filter: string
  @Input() statVisibility: boolean
  JSON: JSON
  BASE64_PNG_STUB: String = 'data:image/jpeg;base64,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';
  loading: boolean = false;
  isTestsRunning:boolean;
  
  private subscription: any[]=[];
  constructor(
    private reportService: ReportService,
    private ngbdModalComponent: NgbdModalComponent,
    private linkGeneratorService: LinkGeneratorService,
    private backstopService: BackstopService,
    private testProcessState:TestProcessState,
    private testConfigService: TestConfigService,
  ) {

  }
  ngOnDestroy() {
    this.subscription.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
  ngOnInit() { 
    this.isTestsRunning = this.testProcessState.runnningStateSubj.getValue();
    this.subscription.push(this.testProcessState.runnningStateSubj.subscribe((arg) => {
      this.isTestsRunning = arg
    }));
  }

  urlClick(event,label){
    event.preventDefault();
    event.stopPropagation();
    var a = this.testConfigService.getTest(label).subscribe((resp) => {
      console.log('data fetched');
      a.unsubscribe();
    });
    var b = this.testConfigService.testList.subscribe((resp:any) => {
      //this.testList = resp;
      window.open(resp.url, '_blank')
      this.closeModal();
      b.unsubscribe();
    })
   
  }

  errorHandler(event) {
    event.target.src = this.BASE64_PNG_STUB;
  }
  getReportImageURL(url: string): string {
    return this.linkGeneratorService.getReportImageURL(url);
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
  openModal(imgLeft?, imgRight?,imgReference?): void {
    if (imgLeft && imgRight) {
      let data = {
        imgLeft: this.getReportImageURL(imgLeft),
        imgRight: this.getReportImageURL(imgRight)
      }
      if(imgReference){
        data['imgReference'] = this.getReportImageURL(imgReference)
      }
      this.openModalCompare(data);
    } else {
      this.openModalLoading();
    }
  }
  closeModal(): void {
    this.loading = false;
    this.ngbdModalComponent.close('End');
  }
  approveTestPair(testPair) {
    let filter = testPair.pair.label;
    this.openModal();
    this.backstopService.run('approve', filter)
      .then(data => {
        return this.backstopService.run('test', filter)
      })
      .then(() => {
        return this.reportService.getReport()
          .subscribe(() => {
            this.closeModal();
            console.info('Refetching data after approving')
          });
      })

  }
  refreshTest(testPair) {
    let filter = testPair.pair.label;
    this.openModal();
    this.backstopService.run('test', filter)
      .then(() => {
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
    }
    if (changes.statVisibility) {
      this.statVisibility = changes.statVisibility.currentValue
    }
    if (changes.filteredTestPairs) {
      this.filteredTestPairs = changes.filteredTestPairs.currentValue
    }
  }


}
