import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { TestProcessState } from '../../services/test-process-state.service';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  public isTestsRunning: boolean;
  ngOnInit(): void {
    IntervalObservable.create(2000)
      .subscribe(() => {
        this.testProcessState.getState().subscribe(); 
      });
      this.testProcessState.runnningStateSubj.subscribe((arg) => {
        this.isTestsRunning = arg
      });

  }

  constructor(
    private sidebarService: SidebarService,
    private testProcessState: TestProcessState,
    private reportService: ReportService
  ) {

  }

  toogleSideBar(): void {
    this.sidebarService.toogleSideBar();
  }

}
