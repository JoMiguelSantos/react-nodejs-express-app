import { connect } from "react-redux";
import React from "react";
import Repo from "../components/Repo/Repo";

const Bookmarks = ({ bookmarkedRepos }) => {
  return (
    <div
      className="container"
      style={{
        "margin-top": "4rem"
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
    bookmarkedRepos: state.repos.repos.filter(repo =>
      state.bookmarks.bookmarks.includes(repo.id)
    )
  };
};

export default connect(mapStateToProps, null)(Bookmarks);
