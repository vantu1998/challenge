import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";

import { Job } from "./shared/models/jobs";
import jobs from "./jobs/jobs.json";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class JobsService {
  constructor(private afs: AngularFirestore) {}

  getJobs(): Observable<Job[]> {
    // TODO: replace this one with an actual call to a API or json-server
    return this.afs.collection<Job>("jobs").valueChanges({ idField: "id" });
  }
  getJobById(id: string): Observable<Job | undefined> {
    return this.afs
      .collection<Job>("jobs")
      .doc(id)
      .valueChanges({ idField: "id" });
  }

  addJob(job: Job) {
    return from(this.afs.collection<Job>("jobs").add(job)).pipe(
      map((doc) => ({ ...job, ...{ id: doc.id } }))
    );
  }

  deleteJob(id: string) {
    return from(this.afs.collection<Job>("jobs").doc(id).delete());
  }

  updateJob(job: Job) {
    const result = this.afs.collection<Job>("jobs").doc(job.id).set(job);
    return from(result);
  }
}
