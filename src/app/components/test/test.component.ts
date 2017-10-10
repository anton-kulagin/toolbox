import 'rxjs/add/operator/switchMap';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TestConfigService } from '../../services/test-config.service';

import { NgbdModalComponent } from '../modal/modal/modal.component';
import { CurrentTestPipe } from '../../pipes/config/current-test.pipe'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, AfterViewInit {
  private id;
  private testList;
  private test;

  private loading: Boolean = false;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private testConfigService: TestConfigService,
    private ngbdModalComponent: NgbdModalComponent,
    private currentTestPipe: CurrentTestPipe
  ) { }
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
  ngAfterViewInit() {
    this.testConfigService.getTestList()
      .do(() => {
        this.openModal();
      })
      .subscribe((resp) => {
        this.closeModal();

      });
  }
  getCurrentTest() {
  }
  ngOnInit() {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.id = params.get('id');
      })
    this.testConfigService.testList.subscribe((resp) => {
      this.testList = resp;

      this.test = this.currentTestPipe.transform(this.testList, this.id)[0];
      console.log(this.id);
      console.log(this.test);
      debugger;
    });
    //   .subscribe(hero => this.hero = hero);
    // this.route.paramMap.switchMap((params: ParamMap) => {
    //   this.test = this.currentTestPipe.transform(this.testList, params.get('id'));
    // }).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

}
