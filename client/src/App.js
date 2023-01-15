import { useSelector } from "react-redux";
import Header from "./components/header";


function App() {

  let state = useSelector(state => state);

  function run() {
    console.log(state);
  };
  
  return (
    <div className="App">
      <Header />
      
      <p onClick={run}>home ig</p>
    </div>
  );
}

export default App;
