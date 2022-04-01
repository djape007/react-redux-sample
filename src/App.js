import React from 'react';
import AddCounter from "./components/AddCounter";
import DisplayCounter from "./components/DisplayCounter";
import ResetCounter from './components/ResetCounter';

function App() {
  return (
    <div className="App">
      <AddCounter />
      <DisplayCounter />
      <ResetCounter />
    </div>
  );
}

export default App;
