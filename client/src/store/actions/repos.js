import * as actionTypes from "./actionTypes";

export const fetchRepos = searchTerms => {
  return dispatch => {
    dispatch(searchingRepos(true));
    console.log(searchTerms);

    return fetch(`http://localhost:4000/api/v1/repos?${searchTerms}`)
      .then(r => r.json())
      .then(json => {
        if (json.error) {
          throw json.error;
        }
        console.log(json, json.data.data.items);

        const repos = json.data.data.items;
        dispatch(setRepos(repos));
        dispatch(searchingRepos(false));
        return repos;
      });
  };
};

export const searchingRepos = payload => {
  return {
    type: actionTypes.SEARCHING_REPOS,
    payload: payload
  };
};

export const setRepos = repos => {
  return {
    type: actionTypes.SET_REPOS,
    payload: repos
  };
};
