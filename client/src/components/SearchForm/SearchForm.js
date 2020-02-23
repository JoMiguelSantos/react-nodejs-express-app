import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import fetch from "isomorphic-unfetch";
import { useDispatch } from "react-redux";

import { newRepos } from "../../store/actions";

const SearchForm = props => {
  const [isLoading, setLoading] = useState(false);
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

    console.log(`http://localhost:3000/api/v1/repos?${searchTerms}`);

    const data = await fetch(
      `http://localhost:3000/api/v1/repos?${searchTerms}`
    );
    const repos = await data.json();
    console.log(repos);
    console.log(repos.data.data.items);

    dispatch(newRepos(repos.data.data.items));
    setLoading(false);
    props.history.push("/repos");
  };

  const searchForm = (
    <form action="/repos" onSubmit={handleSubmit}>
      <label>
        Repo Name
        <input name="name" type="text" placeholder="random repo name"></input>
      </label>
      <label>
        Repo Description
        <input
          name="description"
          type="text"
          placeholder="this is a react repo"
        ></input>
      </label>
      <label>
        Repo README
        <input
          name="readme"
          type="text"
          placeholder="how to install..."
        ></input>
      </label>
      <label>
        Repo Main Language
        <input name="language" type="text" placeholder="JavaScript"></input>
      </label>
      <label>
        Repo Topic
        <input
          name="topic"
          type="text"
          placeholder="server side rendering"
        ></input>
      </label>
      <button>Search</button>
    </form>
  );

  return isLoading ? <p>Searching Repos...</p> : searchForm;
};

export default withRouter(SearchForm);
