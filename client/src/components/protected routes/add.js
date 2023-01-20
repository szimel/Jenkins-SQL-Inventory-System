import React, { useContext, useEffect, useState } from "react";
import Header from "../header";
import CreateJobSite from "../create and search/createJobSite";
import CreateProduct from "../create and search/createProduct";
import AuthContext from "../auth/authProvider";


const Add = () => {
  //for rendering correct jsx
  const [selected, setSelected] = useState("Create Product");
    //set state of authProvider
    const { updateAuth } = useContext(AuthContext);

    useEffect(() => {
      updateAuth('');
    });


  //handles clicks on <p> and also sets page state so it renders correct jsx
  function handleClick(click) {
    setSelected(click.target.innerHTML);
  } 
  return (
    <>
      <Header />
      <div className="container container-add">
        <p onClick={(e) => handleClick(e)}>Create Product</p>
        <p onClick={(e) => handleClick(e)}>Create Jobsite</p>
      </div>

      {/* makes it look like one of them is clicked by whiting out bottom*/}
      <div style={{position: 'relative'}}>
        <div id={selected === 'Create Product' ? 'white1' : 'white2'}></div>
      </div>
      <div className="margin" />
      {selected === "Create Product" ? (
        <React.Fragment>
          <CreateProduct />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <CreateJobSite />
        </React.Fragment>
      )}

    </>
  )
};

export default Add;