import "./App.css";

const App = () => {
  let name = 'Huan';
  let me = true;
  return (
    <div className="App">
      <h1>Hello, React!</h1>
      <h2>This is {me ? name : 'someone'} coding!</h2>
    </div>
  );
}

export default App;
