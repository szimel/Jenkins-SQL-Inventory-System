import { useSelector } from "react-redux";


function App() {

  let state = useSelector(state => state);

  function run() {
    console.log(state);
  };
  
  return (
    <div className="App">
      <a href='http://localhost:5000/auth/google' onClick={() => console.log('click')}>Authenticate with Google</a>
      <p onClick={run}>rerun hore</p>
    </div>
  );
}

export default App;
