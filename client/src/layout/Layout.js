import NavBar from "../components/NavBar/NavBar";

import React from "react";

export default ({ children }) => {
  return (
    <React.Fragment>
      <NavBar />
      {children}
    </React.Fragment>
  );
};
