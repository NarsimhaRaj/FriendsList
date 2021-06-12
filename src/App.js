import React, { useRef, useState } from 'react';
import './App.scss';
import Search from './Components/Search/search';
import List from './Components/List/list';
import * as friendsData from './JSONData/friendslist.json';

function App() {

  var [searchVal, setSearchVal] = useState('');
  var [friendsList, setFriendsList] = useState(friendsData.data);
  var debounceTime;
  var ref = useRef();
  const childRef = useRef();

  const onNameSearch = function (event) {
    let searchText = event.target.value;
    if (event.key == 'Enter' || event.keyCode == 13) {
      if(childRef.current){
        childRef.current.updateFriendsList(searchText);
      }
      event.target.value = "";
    }
    else {
      debounceTime && clearTimeout(debounceTime);

      if (searchText.length < 3) {
        ref.current.style.display = "block";
      }
      else {
        ref.current.style.display = "none";
      }

      debounceTime = setTimeout(() => {
        setSearchVal(searchText);
      }, 200)
    }
  }
  return (
    <div className="App">
      <div className="friends-app">
        <h2>Firends List App</h2>
        <Search ref={ref} onNameSearch={onNameSearch}></Search>
        <List searchVal={searchVal} myFriendsList={friendsList} ref={childRef} />
      </div>
    </div>
  );
}

export default App;
