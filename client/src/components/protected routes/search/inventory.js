import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../auth/authProvider";
import SearchJobsite from "./searchJobsite";
import Header from "../../header";
import Extra from "./extra";




const Search = () => {
  //for rendering correct jsx
  const [selected, setSelected] = useState("Jobsite");

    //runs authProvider on page load
    const { updateAuth } = useContext(AuthContext);
    useEffect(() => {
      updateAuth('');
    });

  //handles clicks on <p> and also sets page state so it renders correct jsx
  function handleClick(click) {
    setSelected(click.target.innerHTML);
  } 

  return(
    <>
      <Header />
        <h2>Search</h2>
        <p>Select the jobsite you want to view. The search is optional. Using it will search a specific jobsite for the query.</p>

        <div className="container container-add">
          <p onClick={(e) => handleClick(e)}>Jobsite</p>
          <p onClick={(e) => handleClick(e)}>Extra</p>
        </div>
        <div style={{position: 'relative'}}>
          <div id={selected === 'Jobsite' ? 'white1' : 'white2'}/>
        </div>
        <div className="margin"/>
        {/* Renders correct jsx */}
        {selected === "Jobsite" ? (
          <React.Fragment>
            <SearchJobsite />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Extra />
          </React.Fragment>
        )}
    </>
  )
};


export default Search;