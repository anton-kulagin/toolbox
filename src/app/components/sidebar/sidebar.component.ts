import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sideBarOpened: boolean;
  constructor(private sidebarService: SidebarService) {
  }

  ngOnInit() {
    this.sidebarService.sidebarState.subscribe((data) => {
      this.sideBarOpened = data;
    })
  }
}
