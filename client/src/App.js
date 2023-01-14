import { useSelector } from "react-redux";


function App() {

  let state = useSelector(state => state);

  function run() {
    console.log(state);
  };
  
  return (
    <div className="App">
      
      <p onClick={run}>home ig</p>
    </div>
  );
}

export default App;
