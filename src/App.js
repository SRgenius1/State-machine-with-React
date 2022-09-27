import { UseState } from './UseState.js';
import { UseReducer } from './UseReduces';
import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name="juansita"/>
      <UseReducer name="juansita"/>
    </div>
  );
};

export default App;
