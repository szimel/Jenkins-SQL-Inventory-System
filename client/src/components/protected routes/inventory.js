import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/authProvider";
import SearchJobsite from "../create and search/searchJobsite";
import Header from "../header";




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
        <p>Please select what inventory you want to view. Selecting extra, shows all the extra inventory at the warehouse. Selecting by job, will allow you to see warehouse inventory, by job. </p>

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
            {null}
          </React.Fragment>
        )}
    </>
  )
};


export default Search;