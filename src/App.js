import React, { useState } from 'react';
import './App.scss';
import Search from './Components/Search/search';
import List from './Components/List/list';

function App() {

  var [searchVal, setSearchVal] = useState('');
  var debounceTime;  

  const onNameSearch = function(event){
    let searchText = event.target.value;
    debounceTime && clearTimeout(debounceTime);

    debounceTime = setTimeout(()=>{
      setSearchVal(searchText);
    }, 500)
  }
  return (
  <div className="App">
    <div className="friends-app">
      <h2>Firends List App</h2>
      <Search onNameSearch={onNameSearch}></Search>
      <List searchVal={searchVal} />
    </div>
  </div>
  );
}

export default App;
