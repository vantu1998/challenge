import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Job } from "../../../shared/models/jobs";
import { TuiDay } from "@taiga-ui/cdk";
import { select, Store } from "@ngrx/store";
import * as jobsActions from "../../state/jobs.actions";
import { selectedJobSelector } from "../../state/jobs.reducer";
import { ActivatedRoute, Router } from "@angular/router";
import { getJobById, updateJob } from "../../state/jobs.actions";

@Component({
  selector: "app-job-create",
  templateUrl: "./job-create.component.html",
  styleUrls: ["./job-create.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobCreateComponent implements OnInit {
  formData!: FormGroup;
  jobType = [
    { value: 0, label: "Full time" },
    { value: 1, label: "Part time" },
  ];
  title!: string;
  mode!: MODE;
  today = new Date();
  tuiDate = new TuiDay(
    this.today.getFullYear(),
    this.today.getMonth(),
    this.today.getDate()
  );

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.initData();
  }

  ngOnInit(): void {
    // @ts-ignore
    if (this.mode == MODE.EDIT) {
      this.title = "Edit job";
      // @ts-ignore
      this.store.pipe(select(selectedJobSelector)).subscribe((data: Job) => {
        this.formData.patchValue(data);
      });
    } else {
      this.title = "Create job";
    }
  }

  initData() {
    const currentUrl = this.router.url;
    this.mode = currentUrl.includes("new") ? MODE.CREATE : MODE.EDIT;
    this.formData = this.fb.group({
      title: ["", Validators.required],
      logo: ["", Validators.required],
      company: ["", Validators.required],
      link: ["", Validators.required],
      date: [null, Validators.required],
      type: [null, Validators.required],
      description: ["", Validators.required],
    });
    const id = String(this.activateRoute.snapshot.paramMap.get("id"));
    this.store.dispatch(getJobById({ id: id }));
  }

  addJob() {
    const job = this.formData.value;
    job.date = job.date.toJSON();
    this.store.dispatch(jobsActions.addJob({ job }));
  }

  updateJob() {
    this.store.dispatch(updateJob({ job: this.formData.value }));
  }
}

export const enum MODE {
  EDIT,
  CREATE,
}
