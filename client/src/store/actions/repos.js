import * as actionTypes from "./actionTypes";

export const newRepos = searchTerms => {
  return {
    type: actionTypes.NEW_REPOS,
    payload: searchTerms
  };
};
