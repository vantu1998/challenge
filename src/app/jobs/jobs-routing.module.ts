import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JobCreateComponent } from "./pages/job-create/job-create.component";

import { JobsComponent } from "./pages/jobs/jobs.component";
import { JobDescriptionComponent } from "./pages/job-description/job-description.component";

const routes: Routes = [
  { path: "", component: JobsComponent },
  { path: "new", component: JobCreateComponent },
  { path: ":id", component: JobDescriptionComponent },
  { path: "edit/:id", component: JobCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
