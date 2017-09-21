import {Component, Input} from '@angular/core';
import { LinkGeneratorService } from '../../../services/link-generator.service';
import {NgbModal, NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
// import {CompareComponent} from '../compare/compare/compare.component';

@Component({
  selector: 'ngbd-modal-component',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class NgbdModalComponent {
  closeResult: string;
  constructor(private modalService: NgbModal) {}

  open(content) {
    // let content={
    //   'ref':ref,
    //   'test':test
    // };
     this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    // const modalRef = this.modalService.open(CompareComponent);
    // modalRef.componentInstance.ref = ref;
    // modalRef.componentInstance.test = test;
  }
   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
