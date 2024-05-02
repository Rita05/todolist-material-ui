import React from 'react';


//components
// import { TodoListContainer } from './pages/TodoListContainer';
import { TodoListContainerWithRedux } from './model/TodoListContainerWithRedux';

//style
import './App.css';


function App() {

  return (
    // <div className="App">
    <div>
      {/* <TodoListContainer /> */}
      {/* <TodoListContainerWithReducers /> */}
      <TodoListContainerWithRedux />
    </div>
  );
}


export default App;
