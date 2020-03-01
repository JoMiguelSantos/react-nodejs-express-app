import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  repos: []
};

const newRepos = async (state, action) => {
  const data = await fetch(
    `http://localhost:4000/api/v1/repos?${action.payload}`
  );
  const repos = await data.json();
  console.log(repos);
  console.log(repos.data.data.items);

  if (repos) {
    console.log("correct path");
    return { repos: repos.data.data.items };
  }
  console.log("wrong path");
};

const reducer = async (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.NEW_REPOS:
      return await newRepos(state, action);
    default:
      return state;
  }
};

export default reducer;
