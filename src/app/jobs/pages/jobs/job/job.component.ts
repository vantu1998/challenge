import { Component, Input, OnInit } from "@angular/core";
import { Job, JobType } from "../../../../shared/models/jobs";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";
import { deleteJob } from "../../../state/jobs.actions";
import { Router } from "@angular/router";

@Component({
  selector: "app-job",
  templateUrl: "./job.component.html",
  styleUrls: ["./job.component.scss"],
})
export class JobComponent implements OnInit {
  @Input() job: Job | null = null;
  faTrash = faTrash;
  faEdit = faEdit;
  JobType = JobType;

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {}

  deleteJob(job: Job) {
    this.store.dispatch(deleteJob({ job }));
  }
  editJob(job: Job) {
    this.router.navigate(["jobs/edit", job.id]).then();
  }
  goToDetail(job: Job) {
    this.router.navigate(["jobs", job.id]);
  }
}
