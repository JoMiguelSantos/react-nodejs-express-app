import { connect, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import Repo from "../components/Repo/Repo";
import { populateBookmarks } from "../store/actions";

const Bookmarks = ({ bookmarkedRepos }) => {
  const dispatch = useDispatch();
  // get bookmarks from DB if state is empty
  useEffect(() => {
    const getBookmarks = async () => {
      const data = await fetch(`http://localhost:3000/api/v1/bookmarks`);
      const bookmarks = await data.json();
      return bookmarks;
    };

    if (bookmarkedRepos.length === 0) {
      getBookmarks().then(bookmarks =>
        dispatch(populateBookmarks(bookmarks.data.data))
      );
    }
  }, []);

  return (
    <div
      className="container"
      style={{
        marginTop: "4rem"
      }}
    >
      {bookmarkedRepos.map(bookmarkedRepo => {
        return (
          <Repo
            key={bookmarkedRepo.id}
            {...bookmarkedRepo}
            isRepoBookmarked={true}
          />
        );
      })}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    bookmarkedRepos: state.bookmarks.bookmarks
  };
};

export default connect(mapStateToProps, null)(Bookmarks);
