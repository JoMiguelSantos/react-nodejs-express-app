import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchRepos } from "../../store/actions";
import "./SearchForm.css";

const SearchForm = ({ history }) => {
  const [isEmpty, setEmpty] = useState(false);
  const dispatch = useDispatch();
  const boundFetchRepos = bindActionCreators(fetchRepos, dispatch);

  const handleSubmit = async e => {
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
    console.log(!searchTerms);

    setEmpty(!searchTerms);
    const repos = searchTerms ? await boundFetchRepos(searchTerms) : "";
    console.log(repos);

    if (!repos) return;
    if (repos && repos.length > 0) history.push("/repos");
  };

  return (
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
      {isEmpty && (
        <p className="empty-submit">
          Please fill in at least one of the fields
        </p>
      )}
    </form>
  );
};

export default withRouter(SearchForm);
