import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import React, { useEffect } from "react";
import Repo from "../../components/Repo/Repo";
import { fetchBookmarks } from "../../store/actions";
import "./Bookmarks.css";

const Bookmarks = ({ bookmarkedRepos, isGettingBookmarks }) => {
  const dispatch = useDispatch();
  const boundFetchBookmarks = bindActionCreators(fetchBookmarks, dispatch);

  // get bookmarks from DB if state is empty
  useEffect(() => {
    if (bookmarkedRepos && bookmarkedRepos.length === 0) {
      boundFetchBookmarks();
    }
  }, []);

  return (
    <div className="container">
      {bookmarkedRepos && bookmarkedRepos.length > 0
        ? bookmarkedRepos.map(bookmarkedRepo => {
            return <Repo key={bookmarkedRepo.id} {...bookmarkedRepo} />;
          })
        : !isGettingBookmarks && (
            <p className="empty-state">
              There are currently no bookmarks saved
            </p>
          )}
      {isGettingBookmarks && <p className="loader">Getting Bookmarks...</p>}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    bookmarkedRepos: state.bookmarks.bookmarks,
    isGettingBookmarks: state.bookmarks.gettingBookmarks
  };
};

export default connect(mapStateToProps, null)(Bookmarks);
