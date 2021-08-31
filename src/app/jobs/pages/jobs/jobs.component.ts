import { FilterCategory } from "./../../state/jobs.reducer";
import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Job } from "../../../shared/models/jobs";
import * as fromJobs from "../../state/jobs.reducer";
import { FormBuilder, FormGroup } from "@angular/forms";
import { debounceTime, map, switchMap } from "rxjs/operators";
import { search } from "../../state/jobs.actions";

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"],
})
export class JobsComponent implements OnInit {
  jobs$!: Observable<Job[]>;
  add = faPlus;
  searchForm!: FormGroup;
  filterForm!: FormGroup;
  filterCategory$!: Observable<FilterCategory>;
  constructor(private store: Store, private fb: FormBuilder) {
    this.searchForm = fb.group({
      title: [],
    });
    this.filterForm = fb.group({
      title: ["All"],
      company: ["All"],
      type: ["-1"],
    });
  }

  ngOnInit(): void {
    this.jobs$ = this.store.pipe(select(fromJobs.selectJobs)).pipe();
    this.filterCategory$ = this.store
      .pipe(select(fromJobs.filterCategory))
      .pipe();
    this.searchForm.valueChanges.pipe(debounceTime(500)).subscribe((data) => {
      this.store.dispatch(search(data));
    });
    this.filterForm.valueChanges.subscribe((filter) => {
      this.jobs$ = this.store.pipe(select(fromJobs.selectJobs)).pipe(
        map((data) => {
          return data.filter((item) => {
            const isMatchTitle = filter.title
              ? filter.title === item.title || filter.title === "All"
              : true;
            const isMatchType =
              filter.type >= 0 ? filter.type == item.type : true;
            const isMatchCompany = filter.company
              ? filter.company === item.company || filter.company === "All"
              : true;
            return isMatchCompany && isMatchTitle && isMatchType;
          });
        })
      );
    });
  }
  readonly jobType = [
    { value: -1, label: "All" },
    { value: 0, label: "Full time" },
    { value: 1, label: "Part time" },
  ];
}
