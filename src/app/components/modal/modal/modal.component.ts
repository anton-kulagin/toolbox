import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class NgbdModalComponent {
  public modalRef: any;
  public data: any;
  public imgRightWidth: number = 100;
  public imgRightHeight: number = 100;
  public max = 100;
  public min = 0;
  public step = 1;
  public sliderVal = 50;
  public visibleWidth = 50;
  @ViewChild('imgRight') imgRight: ElementRef;;
  @ViewChild('imgWrapper') imgWrapper: ElementRef;;
  @ViewChild('imgReference') imgReference: ElementRef;;
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  ngAfterViewInit() {
    if (this.imgReference) {
      var parent = this.imgWrapper.nativeElement,
        child = this.imgReference.nativeElement,
        _this = this;
    } else if (this.imgRight) {
      var parent = this.imgWrapper.nativeElement,
        child = this.imgRight.nativeElement,
        _this = this;
      setTimeout(function () {
        _this.imgRightWidth = parent.offsetWidth;
        _this.imgRightHeight = child.offsetHeight;
      }, 0);
    }
  }
  sliderChange($event) {
    this.visibleWidth = $event.value
  }
  open(content, data: Object = {}) {
    this.modalRef = this.modalService.open(content, {
      keyboard: false,
      backdrop: 'static',
      size: 'lg',
      windowClass: 'modalCenter'
    });
    this.data = data;
    this.modalRef.componentInstance.data = data;
  }
  close(msg: string = ""): void {
    this.modalRef.close('Close click')

  }
}
