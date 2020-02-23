import { connect } from "react-redux";
import React from "react";
import Repo from "../components/Repo";

const Bookmarks = ({ bookmarkedRepos }) => {
  return (
    <div>
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
    bookmarkedRepos: state.repos.repos.filter(repo =>
      state.bookmarks.bookmarks.includes(repo.id)
    )
  };
};

export default connect(mapStateToProps, null)(Bookmarks);
