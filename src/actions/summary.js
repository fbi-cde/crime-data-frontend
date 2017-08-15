import {
  SUMMARY_FAILED,
  SUMMARY_FETCHING,
  SUMMARY_RECEIVED
} from "./constants";
import api from "../util/api";
import mungeSummaryData, { computeTrend, reshapeData } from "../util/summary";
import { getPlaceInfo } from "../util/place";

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
  const { place, placeType } = getPlaceInfo(filter);
  console.log("Place:", place);
  console.log("PlaceType:", placeType);
  if (placeType === "state") {
    console.log("State");
    summaries = computeTrend(place, summaries);
  }
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
