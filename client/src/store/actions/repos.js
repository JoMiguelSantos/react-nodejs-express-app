import * as actionTypes from "./actionTypes";

export const searchingRepos = isSearching => {
  return {
    type: actionTypes.SEARCHING_REPOS,
    payload: isSearching
  };
};

export const setRepos = repos => {
  return {
    type: actionTypes.SET_REPOS,
    payload: repos
  };
};

export const fetchRepos = searchTerms => {
  return dispatch => {
    dispatch(searchingRepos(true));
    return fetch(`http://localhost:4000/api/v1/repos?${searchTerms}`)
      .then(r => r.json())
      .then(json => {
        if (json.error) {
          throw json.error;
        }
        const repos = json.data.data.items;
        dispatch(setRepos(repos));
        dispatch(searchingRepos(false));
        return repos;
      });
  };
};
