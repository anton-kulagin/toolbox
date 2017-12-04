import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgForOf } from '@angular/common';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSliderModule,MatInputModule,MatButtonModule,MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ReportComponent } from './components/report/report.component';
import { NgbdModalComponent } from './components/modal/modal/modal.component';
import { CompareComponent } from './components/modal/compare/compare/compare.component';
import { AccordionComponent } from './components/accrodion/report/accordion.component';
import { AppHeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TestListComponent } from './components/test-list/test-list.component';

import { ReportService } from './services/report.service';
import { SidebarService } from './services/sidebar.service';
import { BackstopService } from './services/backstop.service';
import { TestConfigService } from './services/test-config.service';
import { LinkGeneratorService } from './services/link-generator.service';
import { ErrorListService } from './services/error-list.service';

import { PassedTestsPipe } from './pipes/report/passed-tests.pipe';
import { TestComponent } from './components/test/test.component';
import { CurrentTestPipe } from './pipes/config/current-test.pipe';
import { ErrorListComponent } from './components/error-list/error-list.component';



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
    TestListComponent,
    TestComponent,
    CurrentTestPipe,
    ErrorListComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
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
    SidebarService,
    TestConfigService,
    ErrorListService,
    CurrentTestPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
