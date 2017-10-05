import { Component, Input, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { LinkGeneratorService } from '../../../services/link-generator.service';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//import { NouisliderModule } from 'ng2-nouislider';
// import {CompareComponent} from '../compare/compare/compare.component';

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class NgbdModalComponent {
  closeResult: string;
  modalRef: any;
  imgRightWidth: number = 100;
  start: [10]
  public someValue: number = 5;
  public someMin: number = -10;
  public someMax: number = 10;
  public smeRange = [0, 10];
  public someRange2config: any = {
    behaviour: 'drag',
    pips: {
      mode: 'steps',
      density: 5
    }
  }
  @Input() data: Object;
  @ViewChild('imgRight') imgRight: ElementRef;;
  @ViewChild('imgWrapper') imgWrapper: ElementRef;;
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {
    this.someValue = 50;
  }

  setImageHeight = function () {

  }
  ngAfterViewInit() {
    if (this.imgRight) {
      var parent = this.imgWrapper.nativeElement,
        child = this.imgRight.nativeElement,
        _this = this;
      // this.imgRightWidth = parent.outerWidth();
      //debugger;
      setTimeout(function () {
        console.log(parent)
        console.log(child)
        _this.imgRightWidth = parent.offsetWidth;
        debugger;
      }, 0)
      //child
      //console.log(this.imgRight.nativeElement);
    }
  }
  sliderChange($event) {
    debugger;
  }
  open(content, data: Object = {}) {
    this.modalRef = this.modalService.open(content, {
      keyboard: false,
      backdrop: 'static',
      //inject: 
    });
    this.modalRef.componentInstance.data = data;
    //debugger;
  }
  close(msg: string = ""): void {
    debugger;
    this.modalRef.close('Close click')

  }

  mouseDown(event) {

  }
}
