import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TestConfigService } from '../../services/test-config.service';

import { NgbdModalComponent } from '../modal/modal/modal.component';

import { Configuration } from "../../interface/configuration/configuration";


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
    private ngbdModalComponent: NgbdModalComponent
  ) { }
  ngAfterViewInit() {
    this.testConfigService.getTestList()
      .do(() => {
        this.openModal();
      })
      .subscribe((resp) => {
        this.closeModal();
      });
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
      debugger;
      this.testName = resp;
    });
  }

  removeScenario(id) {
    this.testList.splice(id, 1);
    this.testConfigService.updateTest(this.testList);
    // debugger;
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
    this.testConfigService.updateTest(this.testList);
    //console.log(this.testList)
  }
  downloadSetup(){
    return this.testConfigService.downloadConfig();
  }
}
