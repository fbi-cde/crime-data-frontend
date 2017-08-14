import {
  SUMMARY_FAILED,
  SUMMARY_FETCHING,
  SUMMARY_RECEIVED
} from "./constants";
import api from "../util/api";
import { reshapeData } from "../util/summary";
import mungeSummaryData from "../util/summary";

export const failedSummary = error => ({
  type: SUMMARY_FAILED,
  error
});

export const fetchingSummary = () => ({
  type: SUMMARY_FETCHING
});

export const receivedSummary = (summaries, filter) => {
  console.log("receivedSummary sumaries:", summaries);
  console.log("receivedSummary filter:", filter);
  const data = mungeSummaryData(filter, summaries);
  console.log("Munged Data:", data);
  summaries.data = data;
  return { type: SUMMARY_RECEIVED, summaries: summaries };
};

export const fetchSummaries = params => dispatch => {
  dispatch(fetchingSummary());
  console.log("Fetch Summary Params:", params);
  const requests = api.getSummaryRequests(params);

  return Promise.all(requests)
    .then(data => reshapeData(data))
    .then(summaries => dispatch(receivedSummary(summaries, params)))
    .catch(error => dispatch(failedSummary(error)));
};
