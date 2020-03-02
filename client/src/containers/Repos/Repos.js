import { connect } from "react-redux";
import React from "react";
import "./Repos.css";
import Repo from "../../components/Repo/Repo";

//import selectors
import { getRepos } from "../../store/reducers/repos";
import { getBookmarks } from "../../store/reducers/bookmarks";

const Repos = ({ repos, bookmarkedRepos }) => {
  return (
    <div className="container">
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
    repos: getRepos(state),
    bookmarkedRepos: getBookmarks(state)
  };
};

export default connect(mapStateToProps, null)(Repos);
