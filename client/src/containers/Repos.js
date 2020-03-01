import { connect } from "react-redux";
import React from "react";

import Repo from "../components/Repo/Repo";

const Repos = ({ repos, bookmarkedRepos }) => {
  return (
    <div
      className="container"
      style={{
        marginTop: "4rem"
      }}
    >
      {repos.map(repo => (
        <Repo
          key={repo.id}
          {...repo}
          isRepoBookmarked={
            !!bookmarkedRepos.find(
              bookmarkedRepo => bookmarkedRepo.id === repo.id
            )
          }
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    repos: state.repos.repos,
    bookmarkedRepos: state.bookmarks.bookmarks
  };
};

export default connect(mapStateToProps, null)(Repos);
