import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class NgbdModalComponent {
  private modalRef: any;
  private imgRightWidth: number = 100;
  private max = 100;
  private min = 0;
  private step = 1;
  private sliderVal = 50;
  private visibleWidth = 50;
  @ViewChild('imgRight') imgRight: ElementRef;;
  @ViewChild('imgWrapper') imgWrapper: ElementRef;;
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  ngAfterViewInit() {
    if (this.imgRight) {
      var parent = this.imgWrapper.nativeElement,
        child = this.imgRight.nativeElement,
        _this = this;
      setTimeout(function () {
        _this.imgRightWidth = parent.offsetWidth;
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
    this.modalRef.componentInstance.data = data;
  }
  close(msg: string = ""): void {
    this.modalRef.close('Close click')

  }
}
