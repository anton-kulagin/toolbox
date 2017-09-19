import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { NgFor } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AboutComponent } from './components/about/about.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ReportComponent } from './components/report/report.component';
import { ReportService } from './services/report.service';
import { ReportPipe } from './pipes/report/report.pipe';
import { PassedTestsPipe } from './pipes/report/passed-tests.pipe';
import { StatusFilterPipe } from './pipes/report/status-filter.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalBasic } from './components/modal/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    AboutComponent,
    SidebarComponent,
    ReportComponent,
    ReportPipe,
    PassedTestsPipe,
    StatusFilterPipe,
    NgbdModalBasic
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [ReportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
