import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgFor } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ReportComponent } from './components/report/report.component';
import { ReportService } from './services/report.service';
import { SidebarService } from './services/sidebar.service';
import { BackstopService } from './services/backstop.service';
import { LinkGeneratorService } from './services/link-generator.service';
import { ReportPipe } from './pipes/report/report.pipe';
import { PassedTestsPipe } from './pipes/report/passed-tests.pipe';
import { StatusFilterPipe } from './pipes/report/status-filter.pipe';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent } from './components/modal/modal/modal.component';
import { CompareComponent } from './components/modal/compare/compare/compare.component';
import { AccordionComponent } from './components/accrodion/report/accordion/accordion.component';
import { AppHeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar/sidebar.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { NouisliderModule } from 'ng2-nouislider';
// import { NouisliderModule } from 'ng2-nouislider/src/nouislider';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportComponent,
    ReportPipe,
    PassedTestsPipe,
    StatusFilterPipe,
    NgbdModalComponent,
    CompareComponent,
    AccordionComponent,
    AppHeaderComponent,
    SidebarComponent,
    ReportListComponent,
    NouisliderModule
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  entryComponents: [
    CompareComponent,
    NgbdModalComponent
  ],
  providers: [
    ReportService,
    NgbdModalComponent,
    AccordionComponent,
    LinkGeneratorService,
    BackstopService,
    NgbActiveModal,
    SidebarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
