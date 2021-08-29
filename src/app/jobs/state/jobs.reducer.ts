import { Job } from "./../../shared/models/jobs";
import {
  createReducer,
  on,
  Action,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";

import * as jobsActions from "./jobs.actions";

export interface State {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  selected?: Job | null;
}

const initialState: State = {
  jobs: [],
  loading: false,
  error: null,
  selected: null,
};

const jobsReducer = createReducer<State>(
  initialState,
  on(jobsActions.getJobs, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(jobsActions.getJobsSuccess, (state, { jobs }) => ({
    ...state,
    loading: false,
    error: null,
    jobs,
  })),
  on(jobsActions.getJobsError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(jobsActions.addJob, (state, { job }) => ({
    ...state,
    loading: true,
    selected: job,
  })),
  on(jobsActions.addJobSuccess, (state, { job }) => ({
    ...state,
    loading: false,
    jobs: [...state.jobs, job],
  })),
  on(jobsActions.addJobError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(jobsActions.deleteJob, (state, { job }) => ({
    ...state,
    loading: true,
    selected: job,
  })),
  on(jobsActions.deleteJobSuccess, (state, { job }) => {
    const data = state.jobs.filter((item) => item.id !== job.id);
    return { ...state, jobs: data, loading: false, selected: null };
  }),
  on(jobsActions.deleteJobError, (state, { error }) => {
    return { ...state, loading: false, selected: null, error: error };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return jobsReducer(state, action);
}

export const selectJobsState = createFeatureSelector<State>("jobsFeature");
export const selectJobs = createSelector(
  selectJobsState,
  (state) => state.jobs
);
