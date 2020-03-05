import reposReducer from "../repos";
import bookmarksReducer from "../bookmarks";
import * as actions from "../../actions";
import * as types from "../../actions/actionTypes";

describe("Redux store reducers", () => {
  describe("repos reducer", () => {
    const initialState = {
      repos: [],
      searching: false
    };
    it("should return the initial state", () => {
      expect(reposReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle SEARCHING_REPOS", () => {
      expect(
        reposReducer(initialState, {
          type: types.SEARCHING_REPOS,
          payload: true
        })
      ).toEqual({
        repos: [],
        searching: true
      });

      expect(
        reposReducer(
          {
            repos: [],
            searching: true
          },
          {
            type: types.SEARCHING_REPOS,
            payload: false
          }
        )
      ).toEqual({
        repos: [],
        searching: false
      });
    });

    it("should handle SET_REPOS", () => {
      const repos = [{ name: "repo1" }, { name: "repo2" }];
      const reposReplacement = [{ name: "repo3" }, { name: "repo4" }];
      expect(
        reposReducer(initialState, {
          type: types.SET_REPOS,
          payload: repos
        })
      ).toEqual({
        repos: repos,
        searching: false
      });

      expect(
        reposReducer(
          {
            repos: repos,
            searching: false
          },
          {
            type: types.SET_REPOS,
            payload: reposReplacement
          }
        )
      ).toEqual({
        repos: reposReplacement,
        searching: false
      });
    });
  });

  describe("bookmarks reducer", () => {
    const initialState = {
      bookmarks: [],
      gettingBookmarks: false
    };
    it("should return the initial state", () => {
      expect(bookmarksReducer(undefined, {})).toEqual({
        bookmarks: [],
        gettingBookmarks: false
      });
    });

    it("should handle GETTING_BOOKMARKS", () => {
      expect(
        bookmarksReducer(initialState, {
          type: types.GETTING_BOOKMARKS,
          payload: true
        })
      ).toEqual({
        bookmarks: [],
        gettingBookmarks: true
      });

      expect(
        bookmarksReducer(
          {
            bookmarks: [],
            gettingBookmarks: true
          },
          {
            type: types.GETTING_BOOKMARKS,
            payload: false
          }
        )
      ).toEqual({
        bookmarks: [],
        gettingBookmarks: false
      });
    });

    it("should handle POPULATE_BOOKMARKS", () => {
      const bookmarks = [{ name: "repo1" }, { name: "repo2" }];
      const bookmarksReplacement = [{ name: "repo3" }, { name: "repo4" }];
      expect(
        bookmarksReducer(initialState, {
          type: types.POPULATE_BOOKMARKS,
          payload: bookmarks
        })
      ).toEqual({
        bookmarks: bookmarks,
        gettingBookmarks: false
      });

      expect(
        bookmarksReducer(
          {
            bookmarks: bookmarks,
            gettingBookmarks: false
          },
          {
            type: types.POPULATE_BOOKMARKS,
            payload: bookmarksReplacement
          }
        )
      ).toEqual({
        bookmarks: bookmarksReplacement,
        gettingBookmarks: false
      });
    });

    it("should handle ADD_BOOKMARK", () => {
      expect(
        bookmarksReducer(initialState, {
          type: types.ADD_BOOKMARK,
          payload: { id: 1, name: "repo1" }
        })
      ).toEqual({
        bookmarks: [{ id: 1, name: "repo1" }],
        gettingBookmarks: false
      });

      expect(
        bookmarksReducer(
          {
            bookmarks: [{ id: 1, name: "repo1" }],
            gettingBookmarks: false
          },
          {
            type: types.ADD_BOOKMARK,
            payload: { id: 2, name: "repo2" }
          }
        )
      ).toEqual({
        bookmarks: [
          { id: 1, name: "repo1" },
          { id: 2, name: "repo2" }
        ],
        gettingBookmarks: false
      });
    });

    it("should handle REMOVE_BOOKMARK", () => {
      const filledState = {
        bookmarks: [
          { id: 3, name: "repo3" },
          { id: 4, name: "repo4" }
        ],
        gettingBookmarks: false
      };
      expect(
        bookmarksReducer(filledState, {
          type: types.REMOVE_BOOKMARK,
          payload: 3
        })
      ).toEqual({
        bookmarks: [{ id: 4, name: "repo4" }],
        gettingBookmarks: false
      });

      expect(
        bookmarksReducer(
          {
            bookmarks: [{ id: 4, name: "repo4" }],
            gettingBookmarks: false
          },
          {
            type: types.REMOVE_BOOKMARK,
            payload: 4
          }
        )
      ).toEqual({
        bookmarks: [],
        gettingBookmarks: false
      });
    });
  });
});
