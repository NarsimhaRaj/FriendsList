import React from 'react';
import './search.scss';

const Search = React.forwardRef((props, ref)=>{

    return (
        <>
            <div>                
                <input type="text" id="searchBox" name="search-input" placeholder="Enter your Friend's name" onKeyUp={(event)=>props.onNameSearch(event)}/>
                <div className="error" ref={ref} style={{display: 'none'}}>
                    please enter a valid name
                </div>
            </div>
        </>
    );
});

export default Search;