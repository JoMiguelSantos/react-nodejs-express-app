import * as actionTypes from "../actions/actionTypes";

const initialState = {
  bookmarks: []
};

const addBookmark = (state, action) => {
  return { bookmarks: state.bookmarks.concat(action.payload) };
};

const delBookmark = (state, action) => {
  return {
    bookmarks: state.bookmarks.filter(bookmark => {
      return bookmark.id !== action.payload;
    })
  };
};

const populateBookmarks = (state, action) => {
  return { bookmarks: action.payload };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_BOOKMARK:
      return addBookmark(state, action);
    case actionTypes.DEL_BOOKMARK:
      return delBookmark(state, action);
    case actionTypes.POPULATE_BOOKMARKS:
      return populateBookmarks(state, action);
    default:
      return state;
  }
};

export default reducer;
export { initialState };
