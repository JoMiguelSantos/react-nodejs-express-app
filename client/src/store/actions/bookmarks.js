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

export const gettingBookmarks = payload => {
  return {
    type: actionTypes.GETTING_BOOKMARKS,
    payload: payload
  };
};

export const populateBookmarks = bookmarkedRepos => {
  return {
    type: actionTypes.POPULATE_BOOKMARKS,
    payload: bookmarkedRepos
  };
};

export const fetchBookmarks = () => {
  return dispatch => {
    dispatch(gettingBookmarks(true));
    return fetch(`http://localhost:4000/api/v1/bookmarks`)
      .then(r => r.json())
      .then(json => {
        if (json.error) {
          throw json.error;
        }
        const bookmarkedRepos = json.data.data;
        dispatch(populateBookmarks(bookmarkedRepos));
        dispatch(gettingBookmarks(false));
        return bookmarkedRepos;
      });
  };
};
