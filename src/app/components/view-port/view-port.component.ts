import { TestProcessState } from './../../services/test-process-state.service';
import { TestConfigService } from './../../services/test-config.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-view-port',
  templateUrl: './view-port.component.html',
  styleUrls: ['./view-port.component.scss']
})
export class ViewPortComponent implements OnInit, AfterViewInit {

  public isTestsRunning: boolean;
  public viewPorts: {};
  public viewPortDefault: {};
  constructor(
    private testConfigService: TestConfigService,
    private testProcessState: TestProcessState
  ) { }

  ngOnInit() {
    this.isTestsRunning = this.testProcessState.runnningStateSubj.getValue();
    this.testConfigService.viewportsList.subscribe((resp) => {
      this.viewPorts = resp;
    });
    this.testProcessState.runnningStateSubj.subscribe((arg) => {
      this.isTestsRunning = arg
    });
  };
  ngAfterViewInit() {
    this.testConfigService.getTestList()
      .subscribe((resp) => {
        console.log('data fetched')
      });
  }

  genViewPort = function () {
    return {
      "label": "Rename-Me",
      "width": 1920,
      "height": 1080
    }
  };
  addViewPort() {
    //this.viewPorts.push(this.genViewPort())
  }

}
