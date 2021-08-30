import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Job } from "../../../shared/models/jobs";
import * as jobsActions from "../../state/jobs.actions";
import * as fromJobs from "../../state/jobs.reducer";
import { Router } from "@angular/router";

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"],
})
export class JobsComponent implements OnInit {
  jobs$!: Observable<Job[]>;
  add = faPlus;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(jobsActions.getJobs());
    this.jobs$ = this.store.pipe(select(fromJobs.selectJobs)).pipe();
  }
}
