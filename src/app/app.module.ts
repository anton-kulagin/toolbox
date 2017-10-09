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
import { PassedTestsPipe } from './pipes/report/passed-tests.pipe';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent } from './components/modal/modal/modal.component';
import { CompareComponent } from './components/modal/compare/compare/compare.component';
import { AccordionComponent } from './components/accrodion/report/accordion.component';
import { AppHeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TestListComponent } from './components/test-list/test-list.component';
import { MatSliderModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportComponent,
    PassedTestsPipe,
    NgbdModalComponent,
    CompareComponent,
    AccordionComponent,
    AppHeaderComponent,
    SidebarComponent,
    TestListComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
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
