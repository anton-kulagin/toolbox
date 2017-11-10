import { Component, OnInit, AfterViewInit, HostListener, Host } from '@angular/core';
import { TestConfigService } from '../../services/test-config.service';
import { BackstopService } from '../../services/backstop.service';
import { ReportService } from '../../services/report.service';
import { Observable } from 'rxjs/Rx';

import { NgbdModalComponent } from '../modal/modal/modal.component';

import { Configuration } from "../../interface/configuration/configuration";


export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  DOWN_ARROW = 40
}

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit, AfterViewInit {

  private loading: Boolean = false;
  private testList: Configuration[];
  private testName: any;
  constructor(
    private testConfigService: TestConfigService,
    private backstopService: BackstopService,
    private reportService: ReportService,
    private ngbdModalComponent: NgbdModalComponent
  ) { 
    Observable.fromEvent(document, 'keyup')
      .map((event)=>{
       // debugger;
        return event
      })
      .debounceTime(200)
      .subscribe((event)=>{
       // debugger;
        console.log(event);
        this.keyEvent(event);
      })
  }
  ngAfterViewInit() {
    this.testConfigService.getTestList()
      .do(() => {
        this.openModal();
      })
      .subscribe((resp) => {
        this.closeModal();
      });
  }

 // @HostListener('window:keyup', ['$event'])
  keyEvent(event) {
    console.log(event);
    if (event.keyCode === KEY_CODE.UP_ARROW) {
      this.moveUp();
    }

    if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      this.moveDown();
    }
  }

  moveUp(): void {
    let activePos = this.testList.findIndex((el, pos, arr) => {
      return el.active
    });
    let copyScenario = Object.assign({}, this.testList[activePos]);
    if (activePos > -1) {
      this.removeScenario(activePos);
      this.testList.splice(activePos - 1, 0, copyScenario);
      this.updateTest();
    }
  }

  moveDown(): void {
    let activePos = this.testList.findIndex((el, pos, arr) => {
      return el.active
    });
    let copyScenario = Object.assign({}, this.testList[activePos]);
    if (activePos > -1) {
      this.removeScenario(activePos);
      this.testList.splice(activePos + 1, 0, copyScenario);
      this.updateTest();
    }
  }

  toggleState(id): void {
    //debugger;
    let currStatet = this.testList[id].active;
    this.deactivate();
    this.testList[id].active = !currStatet;
  }
  

  deactivate(){
    this.testList.forEach((el,pos,arr)=>{
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
    this.testConfigService.testList.subscribe((resp) => {
      this.testList = resp;
    });
    this.testConfigService.testName.subscribe((resp) => {
      //debugger;
      this.testName = resp;
    });
  }

  removeScenario(id) {
    this.testList.splice(id, 1);
    this.updateTest();
    // debugger;
  }

  updateTest() {
    this.testConfigService.updateTest(this.testList);
  }
  copyContent(id) {
    let copyScenario = Object.assign({}, this.testList[id])
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
      onBeforeScript: "",
      cookiePath: "",
      referenceUrl: "",
      readyEvent: "",
      readySelector: "",
      delay: "",
      hideSelectors: [],
      removeSelectors: [],
      onReadyScript: "",
      hoverSelector: "",
      clickSelector: "",
      postInteractionWait: "",
      selectorExpansion: "",
      requireSameDimensions: "",
    }
    this.testList.push(tests);
    this.updateTest();
    //console.log(this.testList)
  }
  downloadSetup() {
    return this.testConfigService.downloadConfig();
  }
  startTest(label) {
    let filter = label;
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
}
