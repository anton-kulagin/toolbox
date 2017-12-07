import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class SidebarService {
  private sideBarClosed: boolean = true;
  private sidebareSource = new BehaviorSubject<boolean>(this.sideBarClosed);
  sidebarState = this.sidebareSource.asObservable();

  constructor() { }
  public toogleSideBar(): void {
    this.sideBarClosed = !this.sideBarClosed;
    this.sidebareSource.next(this.sideBarClosed);
  }
}
