import React from "react";
import { useSelector } from "react-redux";
import SearchForm from "../../components/SearchForm/SearchForm";
import "./Searches.css";

const Searches = props => {
  const isSearching = useSelector(state => state.repos.searching);
  return (
    <div className="container">
      {isSearching ? (
        <p className="loader">Searching Repos...</p>
      ) : (
        <SearchForm />
      )}
    </div>
  );
};

export default Searches;
