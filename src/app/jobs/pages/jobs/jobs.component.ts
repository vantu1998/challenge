import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Job } from "../../../shared/models/jobs";
import * as fromJobs from "../../state/jobs.reducer";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { search } from "../../state/jobs.actions";
import { JobsService } from "../../../jobs.service";

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"],
})
export class JobsComponent implements OnInit {
  jobs$!: Observable<Job[]>;
  add = faPlus;
  formData!: FormGroup;
  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
    private js: JobsService
  ) {
    this.formData = fb.group({
      title: [],
      type: [],
    });
  }

  ngOnInit(): void {
    this.jobs$ = this.store.pipe(select(fromJobs.selectJobs)).pipe();
    this.formData.valueChanges.pipe(debounceTime(500)).subscribe((data) => {
      this.store.dispatch(search(data));
    });
  }
  readonly jobType = [
    { value: 0, label: "Full time" },
    { value: 1, label: "Part time" },
  ];
  readonly items = [
    'News',
    'Food',
    'Clothes',
    'Popular',
    'Goods',
    'Furniture',
    'Tech',
    'Building materials',
];
}
