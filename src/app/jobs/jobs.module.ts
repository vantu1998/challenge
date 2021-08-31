import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { JobsRoutingModule } from "./jobs-routing.module";
import { JobsComponent } from "./pages/jobs/jobs.component";
import { JobComponent } from "./pages/jobs/job/job.component";
import { JobDescriptionComponent } from "./pages/job-description/job-description.component";
import { JobCreateComponent } from "./pages/job-create/job-create.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  TuiFilterModule,
  TuiInputDateModule,
  TuiInputModule,
  TuiSelectModule,
  TuiTextAreaModule,
  TuiDataListWrapperModule,
  TuiAvatarModule,
  TuiMultiSelectModule,
} from "@taiga-ui/kit";
import { TuiDataListModule, TuiLabelModule } from "@taiga-ui/core";
import { TuiTextfieldControllerModule } from "@taiga-ui/core";

@NgModule({
  declarations: [
    JobsComponent,
    JobComponent,
    JobDescriptionComponent,
    JobCreateComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    JobsRoutingModule,
    ReactiveFormsModule,
    TuiFilterModule,
    TuiTextAreaModule,
    TuiInputModule,
    TuiInputDateModule,
    TuiTextfieldControllerModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiLabelModule,
    FormsModule,
    TuiAvatarModule,
    TuiMultiSelectModule,
  ],
})
export class JobsModule {}
