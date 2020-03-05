import * as actions from "../../actions";
import * as types from "../../actions/actionTypes";

import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Redux actions", () => {
  describe("repos actions", () => {
    it("should create an action to handle searching for repos", () => {
      const expectedAction = {
        type: types.SEARCHING_REPOS,
        payload: true
      };
      expect(actions.searchingRepos(true)).toEqual(expectedAction);
    });

    it("should create an action to set repos", () => {
      const repos = [{ name: "repo1" }, { name: "repo2" }];
      const expectedAction = {
        type: types.SET_REPOS,
        payload: repos
      };
      expect(actions.setRepos(repos)).toEqual(expectedAction);
    });

    describe("async repos actions", () => {
      afterEach(() => {
        fetchMock.restore();
      });

      it("creates actions SEARCHING_REPOS and SET_REPOS when fetching repos", () => {
        const searchTerms = `name=react&language=javascript`;
        const repos = {
          items: [{ name: "something" }, { name: "something else" }]
        };
        fetchMock.getOnce(`http://localhost:4000/api/v1/repos?${searchTerms}`, {
          body: {
            status: "success",
            data: {
              data: repos
            }
          },
          headers: { "content-type": "application/json" }
        });
        const expectedActions = [
          { type: types.SEARCHING_REPOS, payload: true },
          {
            type: types.SET_REPOS,
            payload: repos.items
          },
          { type: types.SEARCHING_REPOS, payload: false }
        ];
        const store = mockStore({ repos: [] });
        return store.dispatch(actions.fetchRepos(searchTerms)).then(() => {
          // return of async actions
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });
  });

  describe("bookmarks actions", () => {
    it("should add a repo to the bookmarks", () => {
      const bookmarkedRepo = { id: 1, name: "repo1" };
      const expectedAction = {
        type: types.ADD_BOOKMARK,
        payload: bookmarkedRepo
      };
      expect(actions.addBookmark(bookmarkedRepo)).toEqual(expectedAction);
    });

    it("should del a repo from the bookmarks", () => {
      const bookmarkedRepo = { id: 1, name: "repo1" };
      const expectedAction = {
        type: types.REMOVE_BOOKMARK,
        payload: bookmarkedRepo.id
      };
      expect(actions.removeBookmark(bookmarkedRepo.id)).toEqual(expectedAction);
    });

    it("should create an action for getting boorkmarks", () => {
      const expectedAction = {
        type: types.GETTING_BOOKMARKS,
        payload: true
      };
      expect(actions.gettingBookmarks(true)).toEqual(expectedAction);
    });

    it("should create an action to populate the bookmarks from the DB", () => {
      const bookmarks = [{ name: "something" }, { name: "something else" }];
      const expectedAction = {
        type: types.POPULATE_BOOKMARKS,
        payload: bookmarks
      };
      expect(actions.populateBookmarks(bookmarks)).toEqual(expectedAction);
    });

    describe("async bookmarks actions", () => {
      afterEach(() => {
        fetchMock.restore();
      });

      it("creates actions GETTING_BOOKMARKS and POPULATE_BOOKMARKS when fetching bookmarks", () => {
        const bookmarks = [{ name: "something" }, { name: "something else" }];
        fetchMock.getOnce(`http://localhost:4000/api/v1/bookmarks`, {
          body: {
            status: "success",
            data: {
              data: bookmarks
            }
          },
          headers: { "content-type": "application/json" }
        });
        const expectedActions = [
          { type: types.GETTING_BOOKMARKS, payload: true },
          {
            type: types.POPULATE_BOOKMARKS,
            payload: bookmarks
          },
          { type: types.GETTING_BOOKMARKS, payload: false }
        ];
        const store = mockStore({ bookmarks: [] });
        return store.dispatch(actions.fetchBookmarks()).then(() => {
          // return of async actions
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it("creates actions ADDING_BOOKMARK and ADD_BOOKMARK when posting bookmarks", () => {
        const bookmark = { repoId: 1, isBookmarked: true };
        fetchMock.postOnce(`http://localhost:4000/api/v1/bookmarks`, {
          body: {
            status: "success",
            data: {
              data: bookmark
            }
          },
          headers: { "content-type": "application/json" }
        });
        const expectedActions = [
          { type: types.ADDING_BOOKMARK, payload: true },
          {
            type: types.ADD_BOOKMARK,
            payload: bookmark
          },
          { type: types.ADDING_BOOKMARK, payload: false }
        ];
        const store = mockStore({ bookmarks: [] });
        return store.dispatch(actions.postBookmark(bookmark)).then(() => {
          // return of async actions
          expect(store.getActions()).toEqual(expectedActions);
        });
      });

      it("creates actions DELETING_BOOKMARK and DELETE_BOOKMARK when deleting bookmarks", () => {
        const bookmark = { repoId: 1, isBookmarked: true };
        fetchMock.deleteOnce(`http://localhost:4000/api/v1/bookmarks`, {
          body: {
            status: "success",
            data: null
          },
          headers: { "content-type": "application/json" }
        });
        const expectedActions = [
          { type: types.DELETING_BOOKMARK, payload: true },
          {
            type: types.REMOVE_BOOKMARK,
            payload: bookmark.id
          },
          { type: types.DELETING_BOOKMARK, payload: false }
        ];
        const store = mockStore({ bookmarks: [] });
        return store.dispatch(actions.deleteBookmark(bookmark.id)).then(() => {
          // return of async actions
          expect(store.getActions()).toEqual(expectedActions);
        });
      });
    });
  });
});
