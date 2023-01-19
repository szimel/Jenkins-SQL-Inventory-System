import React, { useEffect, useState } from "react";
import Header from "../header";
import CreateJobSite from "./createJobSite";
import CreateProduct from "./createProduct";


const Add = () => {
  //create ref to be clicked on
  const firstClick = React.createRef();

  //for rendering correct jsx
  const [product, setProduct] = useState(true);

  //so correct <p> is clicked on load of page
  useEffect(() => {
    firstClick.current.click();
  },[]);

  //handles clicks on <p> and also sets page state so it renders correct jsx 
  function handleClick(click) {
    const whiteSpace = document.getElementsByName('whiteSpace');
    console.log(whiteSpace);

    if(click.target.innerHTML === 'Create Product') {
      //places white space in correct position
      whiteSpace[0].setAttribute('id', 'white1');

      //sets product so jsx renders corect file
      setProduct(true);

    } else {
      whiteSpace[0].setAttribute('id', 'white2')
      setProduct(false);
    }
  }
  return (
    <>
      <Header />
      <div className="container container-add">
        <p ref={firstClick} onClick={(e) => handleClick(e)}>Create Product</p>
        <p onClick={(e) => handleClick(e)}>Create Jobsite</p>
      </div>

      {/* makes it look like one of them is clicked by whiting out bottom*/}
      <div style={{position: 'relative'}}>
        <div id="white1" name='whiteSpace'></div>
      </div>
      <div className="margin" />
      {product ? (
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