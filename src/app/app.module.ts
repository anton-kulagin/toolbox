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
import { LinkGeneratorService } from './services/link-generator.service';
import { ReportPipe } from './pipes/report/report.pipe';
import { PassedTestsPipe } from './pipes/report/passed-tests.pipe';
import { StatusFilterPipe } from './pipes/report/status-filter.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent } from './components/modal/modal/modal.component';
import { CompareComponent } from './components/modal/compare/compare/compare.component';
import { AccordionComponent } from './components/accrodion/report/accordion/accordion.component';

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
    NgbdModalComponent,
    CompareComponent,
    AccordionComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  entryComponents:[
    CompareComponent
  ],
  providers: [ReportService,NgbdModalComponent,AccordionComponent,LinkGeneratorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
