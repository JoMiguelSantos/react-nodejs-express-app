import { connect } from "react-redux";
import React from "react";

const Bookmarks = ({ bookmarkedRepos }) => {
  return <div>{bookmarkedRepos}</div>;
};

const mapStateToProps = state => {
  return {
    bookmarkedRepos: state.repos.filter(repo =>
      state.bookmarks.includes(repo.id)
    )
  };
};

export default connect(mapStateToProps, null)(Bookmarks);
