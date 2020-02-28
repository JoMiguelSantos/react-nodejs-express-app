import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { capitalize } from "../../utils";
import "./Repo.css";
import { addBookmark, delBookmark } from "../../store/actions";

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
  open_issues_count,
  forks,
  isRepoBookmarked
}) => {
  const [isBookmarked, setBookmarked] = useState(false);
  const dispatch = useDispatch();

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
    forks: forks
  };

  useEffect(() => {
    isRepoBookmarked && setBookmarked(true);
  }, [isRepoBookmarked]);

  const clickHandler = async () => {
    if (isBookmarked) {
      const data = await fetch(`http://localhost:4000/api/v1/bookmarks`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ repoId: id })
      });
      data.status === 204 && dispatch(delBookmark(id));
    } else {
      const data = await fetch(`http://localhost:4000/api/v1/bookmarks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ repoId: id })
      });
      data.status === 201 && dispatch(addBookmark(repoDescriptors));
    }
    setBookmarked(!isBookmarked);
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
      <button
        className={`btn-bookmark ${isBookmarked && `active`}`}
        onClick={clickHandler}
      >
        {isBookmarked ? "Unbookmark" : "Bookmark"}
      </button>
    </div>
  );
};
