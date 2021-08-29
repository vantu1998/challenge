import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { Job } from "./shared/models/jobs";
import jobs from "./jobs/jobs.json";
import { AngularFirestore } from "@angular/fire/compat/firestore";
@Injectable({
  providedIn: "root",
})
export class JobsService {
  constructor(private afs: AngularFirestore) {
    // afs.collection<Job>("jobs").valueChanges().subscribe(console.log);
    // afs.collection("job").snapshotChanges().subscribe(console.log);
  }

  getJobs(): Observable<Job[]> {
    // TODO: replace this one with an actual call to a API or json-server
    return of(jobs);
  }
  addJob() {
    this.afs
      .collection<Partial<Job>>("jobs")
      .add({ link: "abc", logo: "facebook.com" })
      .then(console.log);
  }
}
