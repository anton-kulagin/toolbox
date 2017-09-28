import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
//import { SidebarComponent } from '../sidebar/sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
  }

  toogleSideBar(): void {
    this.sidebarService.toogleSideBar();
    // this.sidebarComponent.toogleSideBar();
  }

}
