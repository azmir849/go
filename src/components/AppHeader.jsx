import React from 'react';


const AppHeader = () => {
  return (
    <>
      <div className="app-header">
        <div className="Container">
          <div className="app-header-wrapper">
            <a href="/" className="logo">
              LOgo
            </a>
            <nav>
              <a href="/">Home</a>
              <a href="/">Projects</a>
              <a href="/">About</a>
              <a href="/">Contact</a>
              <div className="app-header-action"></div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppHeader;
