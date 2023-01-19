import Header from "../header";


const Add = () => {
  return (
    <>
      <Header />
      <div className="container container-add">
        <p>Create Product</p>
        <p>Create Jobsite</p>
      </div>

      {/* makes it look like one of them is clicked by whiting out bottom*/}
      <div style={{position: 'relative'}}>
        <div id="white1"></div>
      </div>
      <div className="margin container-fluid" />
    </>
  )
};

export default Add;