import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import { useDispatch } from "react-redux";

import { newRepos } from "../../store/actions";

import "./SearchForm.css";

const SearchForm = props => {
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();

    let searchTerms = ``;
    [...e.target.elements].forEach((el, index) => {
      if (el.name && el.value) {
        if (index === 0) {
          searchTerms = searchTerms.concat(`${el.name}=${el.value}`);
        } else {
          searchTerms = searchTerms.concat(`&${el.name}=${el.value}`);
        }
      }
    });

    try {
      const data = await fetch(
        `http://localhost:4000/api/v1/repos?${searchTerms}`
      );
      const repos = await data.json();
      console.log(repos);
      if (repos) {
        setEmpty(true);
      } else {
        dispatch(newRepos(repos.data.data.items));
      }
    } catch (err) {
      throw Error(err);
    }

    setLoading(false);
    props.history.push("/repos");
    console.log(props.history);
  };

  const searchForm = (
    <form className="search-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          name="name"
          type="text"
          placeholder="e.g. node-express-app"
        ></input>
      </label>
      <label>
        Description
        <input
          name="description"
          type="text"
          placeholder="e.g. A node express app built from scratch"
        ></input>
      </label>
      <label>
        README
        <input
          name="readme"
          type="text"
          placeholder="e.g. API documentation on how to use it"
        ></input>
      </label>
      <label>
        Main Language
        <input
          name="language"
          type="text"
          placeholder="e.g. JavaScript"
        ></input>
      </label>
      <label>
        Topic
        <input
          name="topic"
          type="text"
          placeholder="e.g. Server Side Rendering"
        ></input>
      </label>
      <button className="btn-search">Search</button>
    </form>
  );

  if (isLoading) {
    return <p className="loader">Searching Repos...</p>;
  } else if (isEmpty) {
    return <p className="empty-state">No Repos were found</p>;
  } else {
    return searchForm;
  }
};

export default withRouter(SearchForm);
