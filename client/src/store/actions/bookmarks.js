import * as actionTypes from "./actionTypes";

export const addBookmark = bookmarkedRepo => {
  return {
    type: actionTypes.ADD_BOOKMARK,
    payload: bookmarkedRepo
  };
};

export const delBookmark = repoId => {
  return {
    type: actionTypes.DEL_BOOKMARK,
    payload: repoId
  };
};

export const populateBookmarks = bookmarkedRepos => {
  return {
    type: actionTypes.POPULATE_BOOKMARKS,
    payload: bookmarkedRepos
  };
};
