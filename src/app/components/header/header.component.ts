import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent {

  constructor(private sidebarService: SidebarService) { }

  toogleSideBar(): void {
    this.sidebarService.toogleSideBar();
  }

}
