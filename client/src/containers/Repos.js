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
      {repos && repos.length > 0 ? (
        repos.map(repo => (
          <Repo
            key={repo.id}
            {...repo}
            isRepoBookmarked={
              !!bookmarkedRepos.find(
                bookmarkedRepo => bookmarkedRepo.id === repo.id
              )
            }
          />
        ))
      ) : (
        <p className="empty-state">There are currently no repositories saved</p>
      )}
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
