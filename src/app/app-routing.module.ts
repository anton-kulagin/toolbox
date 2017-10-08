import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './components/report/report.component';
import { ReportListComponent } from './components/report-list/report-list.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: "**", redirectTo: "report", pathMatch: "full" },
  { path: "report", component: ReportComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//{ path: "", redirectTo:"report", component: HomeComponent },
//{ path: "report", component: ReportComponent },
//{ path: "report-list", component: ReportListComponent }