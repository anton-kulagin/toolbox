import {Component, Input} from '@angular/core';
import {LinkGeneratorService } from '../../../services/link-generator.service';
import {NgbModal, NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// import {CompareComponent} from '../compare/compare/compare.component';

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class NgbdModalComponent {
  closeResult: string;
  modalRef:any;
  @Input() data:Object;
  constructor(private modalService: NgbModal,public activeModal: NgbActiveModal) {}

  open(content, data:Object={}) {
    this.modalRef = this.modalService.open(content,{
      keyboard:false,
      backdrop:'static'
    });
    this.modalRef.componentInstance.data = data;
  }
  close(msg:string=""):void {
    debugger;
    this.modalRef.close('Close click')
    
  }
  //  private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }
}
