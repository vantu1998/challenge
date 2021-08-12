import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";

import * as fromJobs from "./jobs/state/jobs.reducer";

interface State {
  jobsFeature: fromJobs.State;
}

export const reducers: ActionReducerMap<State> = {
  jobsFeature: fromJobs.reducer,
};

export const selectJobsFeature = createFeatureSelector<State, fromJobs.State>(
  "jobsFeature"
);
export const selectJobsState = createSelector(
  selectJobsFeature,
  (state) => state.jobs
);
