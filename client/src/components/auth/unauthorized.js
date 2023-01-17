import Header from "../header";


const Unauthorized = () => {
  return (
    <>
      <Header />
      <div className="container-fluid container-unauthorized" >
        <h5>
          Sorry, you aren't authorized to view this page.
        </h5>
      </div>
    </>
  )
};


export default Unauthorized;