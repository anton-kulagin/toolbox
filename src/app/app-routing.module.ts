import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './components/report/report.component';
import { TestListComponent } from './components/test-list/test-list.component';
import { TestComponent } from './components/test/test.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: "test-list", component: TestListComponent },
  { path: "test-list/:id", component: TestComponent },
  { path: "report", component: ReportComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//{ path: "", redirectTo:"report", component: HomeComponent },
//{ path: "report", component: ReportComponent },
//{ path: "report-list", component: ReportListComponent },
//{ path: "**", redirectTo: "report", pathMatch: "full" },