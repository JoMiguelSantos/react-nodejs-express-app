import { connect } from "react-redux";
import React from "react";

import Repo from "../components/Repo/Repo";

const Repos = ({ repos }) => {
  return (
    <div
      className="container"
      style={{
        "margin-top": "4rem"
      }}
    >
      {repos.map(repo => (
        <Repo key={repo.id} {...repo} />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    repos: state.repos.repos
  };
};

export default connect(mapStateToProps, null)(Repos);
