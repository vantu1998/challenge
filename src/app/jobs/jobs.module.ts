import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { JobsRoutingModule } from "./jobs-routing.module";
import { JobsComponent } from "./pages/jobs/jobs.component";
import { JobComponent } from "./pages/jobs/job/job.component";
import { JobDescriptionComponent } from "./pages/job-description/job-description.component";

@NgModule({
  declarations: [JobsComponent, JobComponent, JobDescriptionComponent],
  imports: [CommonModule, FontAwesomeModule, JobsRoutingModule],
})
export class JobsModule {}
