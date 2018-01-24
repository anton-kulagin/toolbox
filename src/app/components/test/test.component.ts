import 'rxjs/add/operator/switchMap';
import { FormGroup, FormControl, FormArray, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TestConfigService } from '@serv/test-config.service';

import { NgbdModalComponent } from '../modal/modal/modal.component';
import { CurrentTestPipe } from '../../pipes/config/current-test.pipe'
import { CustomValidators } from '../validators/custom-validators';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, AfterViewInit {
  private id;
  private testList;
  public test;
  objectKeys = Object.keys;
  private loading: Boolean = false;
  private requiredList = [
    'url', 'label', 'selectors'
  ];
  private hiddenList = [
    'onBeforeScript'
  ];
  public myFormControl:{};
  public myForm: FormGroup;
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
      this.myFormControl = this.formGroupObj();
      this.myForm = new FormGroup(this.myFormControl)
    });

  }

  goBack(): void {
    this.location.back();
  }
  updateChanges() {
    this.testConfigService.updateTest(this.testList);

    console.log(this.testList)
  }
  isRequired(field): boolean {
    return this.requiredList.indexOf(field) > -1;
  }
  isDisabled(field, value): boolean {
    return false;
  }

  formGroupObj() {
    let tempObj = {};
    for (const key in this.test) {
      if (this.test.hasOwnProperty(key)) {
        let formContralBalidators=[];
        if (this.requiredList.indexOf(key)>-1){
          formContralBalidators.push(Validators.required)
        }
        if(typeof CustomValidators[key]!='undefined'){
          formContralBalidators.push(CustomValidators[key])
        }
        tempObj[key] = new FormControl(this.test[key], formContralBalidators);
      }
    }
    return tempObj;
  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.myForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  public isHiddenOption(key){
    return this.hiddenList.indexOf(key)>-1
  }

}



