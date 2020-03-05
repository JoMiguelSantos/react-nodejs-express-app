import * as actionTypes from "./actionTypes";

export const addBookmark = bookmarkedRepo => {
  return {
    type: actionTypes.ADD_BOOKMARK,
    payload: bookmarkedRepo
  };
};

export const addingBookmark = payload => {
  return {
    type: actionTypes.ADDING_BOOKMARK,
    payload: payload
  };
};

export const postBookmark = bookmarkedRepo => {
  return dispatch => {
    dispatch(addingBookmark(true));
    return fetch(`http://localhost:4000/api/v1/bookmarks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ repoId: bookmarkedRepo.id })
    })
      .then(r => r.json())
      .then(json => {
        if (json.error) {
          throw json.error;
        }
        dispatch(addBookmark(bookmarkedRepo));
        dispatch(addingBookmark(false));
        return json.data.data;
      });
  };
};

export const removeBookmark = repoId => {
  return {
    type: actionTypes.REMOVE_BOOKMARK,
    payload: repoId
  };
};

export const deletingBookmark = payload => {
  return {
    type: actionTypes.DELETING_BOOKMARK,
    payload: payload
  };
};

export const deleteBookmark = repoId => {
  return dispatch => {
    dispatch(deletingBookmark(true));
    return fetch(`http://localhost:4000/api/v1/bookmarks`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ repoId: repoId })
    }).then(res => {
      if (res.error) {
        throw res.error;
      }

      dispatch(removeBookmark(repoId));
      dispatch(deletingBookmark(false));
      return res;
    });
  };
};

export const populateBookmarks = bookmarkedRepos => {
  return {
    type: actionTypes.POPULATE_BOOKMARKS,
    payload: bookmarkedRepos
  };
};

export const gettingBookmarks = payload => {
  return {
    type: actionTypes.GETTING_BOOKMARKS,
    payload: payload
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
