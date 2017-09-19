import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdModalBasic } from './modal.component';

describe('ModalComponent', () => {
  let component: NgbdModalBasic;
  let fixture: ComponentFixture<NgbdModalBasic>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgbdModalBasic ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdModalBasic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
