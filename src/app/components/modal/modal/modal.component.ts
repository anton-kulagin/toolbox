import { Component, Input, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { LinkGeneratorService } from '../../../services/link-generator.service';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// import { NouisliderModule } from 'ng2-nouislider';
//import { NouisliderModule } from 'ng2-nouislider';
// import {CompareComponent} from '../compare/compare/compare.component';

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class NgbdModalComponent {
  closeResult: string;
  visibleWidth: 50;
  modalRef: any;
  imgRightWidth: number = 100;
  start: [10];
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(v) {
    this._tickInterval = Number(v);
  }
  private _tickInterval = 1;
  @Input() someValue: number;
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
    this.visibleWidth = 50;
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
    //debugger;
    this.visibleWidth = $event.value
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
