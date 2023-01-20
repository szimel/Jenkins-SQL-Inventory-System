import Header from "./header"


const NotExist = () => {
  return(
    <>
      <Header />
      <div className="m-4 mx-auto container-fluid">Sorry, this page doesn't exist. Please use the header to navigate to existing URL's.</div>
    </>
  );
};

export default NotExist;