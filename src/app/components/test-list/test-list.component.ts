import { Component, OnInit, AfterViewInit, HostListener, Host, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { TestConfigService } from '@serv/test-config.service';
import { BackstopService } from '@serv/backstop.service';
import { ReportService } from '@serv/report.service';
import { Observable } from 'rxjs/Rx';
import {MatTooltipModule} from '@angular/material';

import { NgbdModalComponent } from '../modal/modal/modal.component';


import { TestProcessState } from '@serv/test-process-state.service';
import { Configuration } from "../../interface/configuration/configuration";


export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  DOWN_ARROW = 40
};

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit, AfterViewInit, OnDestroy {
  [x: string]: any;


  public filterText:String="";
  private loading: Boolean = false;
  public testList: Configuration[];
  public testListFiltered: Configuration[];
  public testName: any;
  private subscription: any[]=[];
  private requestState: any;
  public isTestsRunning: boolean;
  constructor(
    private testConfigService: TestConfigService,
    private backstopService: BackstopService,
    private reportService: ReportService,
    private testProcessState: TestProcessState,
    private ngbdModalComponent: NgbdModalComponent
  ) { }
  ngOnDestroy() {
      this.subscription.forEach(subscription => {
        subscription.unsubscribe();
      });
    // this.subscription.unsubscribe();
    // this.subscription.unsubscribe();
    // this.testConfigService.testList.unsubscribe();
    // this.testConfigService.testName.unsubscribe();
    // this.testProcessState.runnningStateSubj.unsubscribe();

  }

  ngAfterViewInit() {
    this.subscription.push(this.testConfigService.getTestList()
      .do(() => {
        this.openModal();
      })
      .subscribe((resp) => {
        this.closeModal();
      }));
  }
  @HostListener('window:keydown', ['$event'])
  preventScrolling1(event) {
    if (event.keyCode == KEY_CODE.DOWN_ARROW || event.keyCode == KEY_CODE.UP_ARROW) {
      event.preventDefault();
      console.log('prevernt');
      event.returnValue = false;
      return false;
    }

  }


  keyEvent(event) {
    if (event.keyCode === KEY_CODE.UP_ARROW) {
      this.moveUp();
    }

    if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      this.moveDown();
    }
  }
  scrollToElem() {
    let el = document.querySelector('.activeTest');
    el.scrollIntoView({ behavior: "smooth" });

  }
  moveUp(): void {
    let activePos = this.testList.findIndex((el, pos, arr) => {
      return el.active
    });
    let copyScenario = Object.assign({}, this.testList[activePos - 1]);
    if (activePos > 0 && activePos <= this.testList.length) {
      this.testList[activePos - 1] = this.testList[activePos];
      this.testList[activePos] = copyScenario;
      this.updateTest();
      this.scrollToElem();
    }

  }

  moveDown(): void {
    let activePos = this.testList.findIndex((el, pos, arr) => {
      return el.active
    });
    let copyScenario = Object.assign({}, this.testList[activePos + 1]);
    if (activePos >= 0 && activePos < this.testList.length - 1) {
      this.testList[activePos + 1] = this.testList[activePos];
      this.testList[activePos] = copyScenario;
      this.updateTest();
      this.scrollToElem();
    }
  }

  toggleState(id): void {
    let currStatet = this.testList[id].active;
    this.deactivate();
    this.testList[id].active = !currStatet;
  }


  deactivate() {
    this.testList.forEach((el, pos, arr) => {
      delete el.active;
    })
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
  changeOption(label): void {

  }
  ngOnInit() {
    this.subscription.push(Observable.fromEvent(document, 'keyup')
      .map((event) => {
        return event
      })
      .debounceTime(200)
      .subscribe((event) => {
        this.keyEvent(event);
      }))
    this.isTestsRunning = this.testProcessState.runnningStateSubj.getValue();
    this.subscription.push(this.testConfigService.testList.subscribe((resp) => {
      this.testList = resp;
      //this.testListFiltered = resp;
      this.filterTest();
    }));
    this.subscription.push(this.testConfigService.testName.subscribe((resp) => {
      this.testName = resp;
    }));
    this.subscription.push(this.testProcessState.runnningStateSubj.subscribe((arg) => {
      this.isTestsRunning = arg
    }));


  }

  removeScenario(label) {
    let id = this.testList.findIndex((el)=>{
      return el.label==label
    })
    this.testList.splice(id, 1);
    this.filterTest();
    this.updateTest();
  }

  updateTest() {
    this.testConfigService.updateTest(this.testList);
  }
  copyContent(id) {
    let copyScenario = Object.assign({}, this.testListFiltered[id])
    copyScenario.label += '-copy';
    this.testList.push(copyScenario);
    this.updateTest();
  }

  addTest = function () {
    var tests: Configuration = {
      label: "NewTest" + this.testList.length,
      url: "",
      selectors: ["document"],
      misMatchThreshold: "0.1",
      onBeforeScript: "chromy/onBefore.js",
      cookiePath: "",
      referenceUrl: "",
      readyEvent: "",
      readySelector: "",
      delay: "",
      hideSelectors: [],
      removeSelectors: [],
      onReadyScript: "chromy/onReady.js",
      hoverSelector: "",
      clickSelector: "",
      postInteractionWait: "",
      selectorExpansion: "",
      requireSameDimensions: "",
      comment:"",
      active:true
    }
    this.testList.push(tests);
    this.updateTest();
  }
  downloadSetup():any {
    return this.testConfigService.downloadConfig();
  }
  isTableAreaReady() {
    return this.testListFiltered && typeof (this.isTestsRunning) != 'undefined';
  }
  startTest(label) {
    let filter = label;
    if (this.isTestsRunning) {
      return;
    }
    this.openModal();
    this.isTestsRunning = true;
    this.backstopService.run('test', filter)
      .then(() => {
        return this.reportService.getReport()
          .subscribe(() => {
            this.closeModal();
            console.info('Refetching data after approving')
          });
      })
  }

  filterTest() {
    let _that = this;
    this.testListFiltered = this.testList.filter((el)=>{
      return el.label.toLowerCase().indexOf(_that.filterText.toLowerCase())>-1;
    })
  }
}
