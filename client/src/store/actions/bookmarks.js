import * as actionTypes from "./actionTypes";

export const addBookmark = repoId => {
  return {
    type: actionTypes.ADD_BOOKMARK,
    payload: repoId
  };
};

export const delBookmark = repoId => {
  return {
    type: actionTypes.DEL_BOOKMARK,
    payload: repoId
  };
};
