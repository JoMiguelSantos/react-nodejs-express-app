import * as actionTypes from "../actions/actionTypes";

export const initialState = {
  bookmarks: []
};

const addBookmark = (state, action) => {
  return state.bookmarks.concat(action.payload.repoId);
};

const delBookmark = (state, action) => {
  return state.bookmarks.filter(bookmark => bookmark !== action.payload.repoId);
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BOOKMARK:
      return addBookmark(state, action);
    case actionTypes.DEL_BOOKMARK:
      return delBookmark(state, action);
    default:
      return state;
  }
};

export default reducer;
