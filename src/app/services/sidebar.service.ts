import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class SidebarService {

  private sidebareSource = new BehaviorSubject<boolean>(true);
  sidebarState = this.sidebareSource.asObservable();

  private sideBarOpened: boolean = false;
  constructor() { }
  public toogleSideBar(): void {
    this.sideBarOpened = !this.sideBarOpened;
    this.sidebareSource.next(this.sideBarOpened);
  }
}
