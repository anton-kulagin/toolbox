import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './components/report/report.component';
import { TestListComponent } from './components/test-list/test-list.component';
import { TestComponent } from './components/test/test.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorListComponent } from './components/error-list/error-list.component';
import { ViewPortComponent } from './components/view-port/view-port.component';

const routes: Routes = [
  { path: "", redirectTo: "report", pathMatch: "full" },
  { path: "error-list", component: ErrorListComponent },
  { path: "test-list", component: TestListComponent },
  { path: "test-list/:id", component: TestComponent },
  { path: "report", component: ReportComponent },
  { path: "view-port", component: ViewPortComponent },
  { path: '**', redirectTo: "report" }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
