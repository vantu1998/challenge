import { Job } from "./../../shared/models/jobs";
import {
  createReducer,
  on,
  Action,
  createFeatureSelector,
  createSelector,
  createAction,
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

// @ts-ignore
const jobsReducer = createReducer<State>(
  initialState,
  on(jobsActions.getJobs, (state) => ({
    ...state,
    loading: true,
    selected: null,
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
    return { ...state, loading: false, error: error };
  }),
  on(jobsActions.updateJob, (state, { job }) => {
    return {
      ...state,
      loading: true,
      selected: job,
    };
  }),
  on(jobsActions.updateJobSuccess, (state, { job }) => {
    const index = state.jobs.findIndex((item) => {
      debugger;
      return item.id === job.id;
    });
    if (index >= 0) {
      const data = [
        ...state.jobs.slice(0, index),
        job,
        ...state.jobs.slice(index + 1),
      ];
      return { ...state, jobs: data, error: null, loading: false };
    }
    return { ...state, error: null, loading: false };
  }),
  on(jobsActions.updateJobError, (state, { error }) => {
    return { ...state, loading: false, error: error };
  }),
  on(jobsActions.getJobById, (state, { id }) => {
    return { ...state, selected: null, loading: false };
  }),
  on(jobsActions.getJobByIdSuccess, (state, { job }) => {
    return { ...state, selected: job };
  }),
  on(jobsActions.getJobByIdFail, (state, { error }) => {
    return { ...state, loading: false, error: error };
  }),
  on(jobsActions.searchSuccess, (state, { jobs }) => {
    return {
      ...state,
      jobs,
    };
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
export const selectedJobSelector = createSelector(
  selectJobsState,
  (state) => state.selected
);
