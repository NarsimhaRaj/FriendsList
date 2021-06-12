import React from 'react';
import './search.scss';

function Search(props){

    return (
        <>
            <div>                
                <input type="text" id="searchBox" name="search-input" placeholder="Enter your Friend's name" onKeyUp={(event)=>props.onNameSearch(event)}/>
            </div>
        </>
    );
}

export default Search;