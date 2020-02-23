import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { capitalize } from "../utils";
import "./Repo.css";
import { addBookmark, delBookmark } from "../store/actions";

export default ({
  id,
  name,
  html_url,
  description,
  created_at,
  updated_at,
  stargazers_count,
  watchers_count,
  language,
  forks_count,
  open_issues_count,
  forks,
  open_issues,
  isRepoBookmarked
}) => {
  const [isBookmarked, setBookmarked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    isRepoBookmarked && setBookmarked(true);
  }, [isRepoBookmarked]);

  const clickHandler = () => {
    setBookmarked(!isBookmarked);
    isBookmarked ? dispatch(delBookmark(id)) : dispatch(addBookmark(id));
  };

  const repoDescriptors = {
    id: id,
    name: name,
    html_url: html_url,
    description: description,
    created_at: created_at,
    updated_at: updated_at,
    stargazers_count: stargazers_count,
    watchers_count: watchers_count,
    language: language,
    open_issues_count: open_issues_count,
    forks: forks,
    open_issues: open_issues
  };

  return (
    <div className="repo__descriptor--items">
      {Object.entries(repoDescriptors)
        .slice(1)
        .map(([key, value]) => {
          return (
            <div key={key} className="repo__descriptor--item">
              <label>{`${capitalize(key, "_")}:`}</label>
              <p>{value}</p>
            </div>
          );
        })}
      <button onClick={clickHandler}>
        {isBookmarked ? "Unbookmark" : "Bookmark"}
      </button>
    </div>
  );
};
