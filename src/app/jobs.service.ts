import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";

import { Job } from "./shared/models/jobs";
import jobs from "./jobs/jobs.json";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { map } from "rxjs/operators";
import firebase from "firebase/compat";

@Injectable({
  providedIn: "root",
})
export class JobsService {
  constructor(private afs: AngularFirestore) {}

  getJobs(): Observable<Job[]> {
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

  search(title?: string) {
    title = title?.toLocaleLowerCase();
    return this.getJobs().pipe(
      map((jobs) => {
        return jobs.filter((item) => {
          let isMath = true;
          if (title) {
            isMath =
              item.title?.toLocaleLowerCase().includes(title) ||
              item.company?.toLocaleLowerCase().includes(title) ||
              item.description?.toLocaleLowerCase().includes(title);
          }
          return isMath;
        });
      })
    );
  }
}
