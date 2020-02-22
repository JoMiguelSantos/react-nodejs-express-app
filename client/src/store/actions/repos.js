import * as actionTypes from "./actionTypes";

export const newRepos = repos => {
  return {
    type: actionTypes.NEW_REPOS,
    payload: repos
  };
};
