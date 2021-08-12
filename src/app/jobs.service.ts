import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Job } from "./shared/models/jobs";
import jobs from "./jobs/jobs.json";

@Injectable({
  providedIn: "root",
})
export class JobsService {
  constructor() {}

  getJobs(): Observable<Job[]> {
    // TODO: replace this one with an actual call to a API or json-server
    return of(jobs);
  }
}
