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

export interface FilterCategory {
  title: string[];
  company: string[];
}

export interface State {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  selected?: Job | null;
  filterCategory: FilterCategory;
  jobFilterResult: Job[];
}

const initialState: State = {
  jobs: [],
  loading: false,
  error: null,
  selected: null,
  filterCategory: { title: ["All"], company: ["All"] },
  jobFilterResult: [],
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
  on(jobsActions.getJobsSuccess, (state, { jobs }) => {
    let filterCategory: FilterCategory = { title: ["All"], company: ["All"] };
    jobs.forEach((item) => {
      if (item.title && item.company) {
        if (!filterCategory.title.includes(item.title)) {
          filterCategory.title = [...filterCategory.title, item.title];
        }
        if (!filterCategory.company.includes(item.company)) {
          filterCategory.company = [...filterCategory.company, item.company];
        }
      }
    });
    return {
      ...state,
      filterCategory: filterCategory,
      loading: false,
      error: null,
      jobs,
      jobFilterResult: [],
    };
  }),
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
  }),
  on(jobsActions.filterSuccess, (state, { job }) => {
    return {
      ...state,
      jobFilterResult: job,
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
export const filterCategory = createSelector(
  selectJobsState,
  (state) => state.filterCategory
);
export const jobFilterResult = createSelector(
  selectJobsState,
  (state) => state.jobFilterResult
);
