import { Component, OnInit } from "@angular/core";

import { select, Store } from "@ngrx/store";
import { Router, ActivatedRoute } from "@angular/router";
import { Job } from "../../../shared/models/jobs";
import { selectedJobSelector } from "../../state/jobs.reducer";
import { getJobById, updateJob } from "../../state/jobs.actions";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-job-description",
  templateUrl: "./job-description.component.html",
  styleUrls: ["./job-description.component.scss"],
})
export class JobDescriptionComponent implements OnInit {
  job!: Job;
  jobId!: string;
  formData!: FormGroup;

  constructor(
    private store: Store,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    const id = String(this.activateRoute.snapshot.paramMap.get("id"));
    this.store.dispatch(getJobById({ id: id }));
    this.formData = this.fb.group({
      description: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    // @ts-ignore
    this.store.pipe(select(selectedJobSelector)).subscribe((data: Job) => {
      this.job = data;
      this.formData.patchValue(data);
    });
  }

  updateJob() {
    const data = JSON.parse(JSON.stringify(this.job));
    data.description = this.formData.value.description;
    this.store.dispatch(updateJob({ job: data }));
  }
}
