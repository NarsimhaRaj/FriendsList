import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import * as friendsData from '../../JSONData/friendslist.json';
import { faStar, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './list.scss';
import Pagination from '../Pagination/pagination';

function FriendDetails({ index, friend, makeItStarred, deleteFromList }) {
    return (
        <li>
            <div className="friend-name">
                <h3>{friend.name}</h3>
                <p>is your friend</p>
            </div>
            <div className="star">
                <FontAwesomeIcon onClick={()=>makeItStarred(index)} className={friend.starred ? "yellow-star" : "normal-star"} icon={faStar} />
            </div>
            <div className="delete" onClick={()=>deleteFromList(index)}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </div>
        </li>
    );
}

function List({ searchVal }) {

    var [friendsList, setFriendsList] = useState([friendsData.data]);
    var [currentIndex, setCurrentIndex] = useState(0);
    var [totalPages, setTotalPages] = useState(()=> friendsData.data.length/4);
    var [startIndex, setStartIndex] = useState(0);
    var [endIndex, setEndIndex] = useState(()=>{
        return friendsData.data.length < 4 ? friendsData.data.length : 4;
    });
    const sortByStarred = function(list){
        return list.sort((a, b) => (a.starred || (!a.starred && !b.starred)) ? a : b);
    }

    const filterByName = function(list){
        return list.filter((item) => item.name.indexOf(searchVal) !== -1);
    }

    const makeItStarred = function(index){
        let friend = friendsList[index];
        let list = deleteFromList(index);
        friend.starred = !friend.starred;
        list.push(friend);
        setFriendsList(sortByStarred(list));
    }

    const deleteFromList = function(index){
        friendsList.splice(index, 1);
        setFriendsList(friendsList);
        return friendsList;
    }

    useEffect(() => {
        let data = friendsData.data;
        let list = data.length >= 4 ? data.slice(0, 4) : data;
        list =sortByStarred(filterByName(list));
        setFriendsList(list);
        setTotalPages(list.length);
    }, [searchVal]);

    const onPageClick = function(index) {
        setCurrentIndex(index);
        setStartIndex(4*index);
        let endIndex = startIndex + 4;
        if(friendsList.length < endIndex){
            endIndex = friendsList.length;
        }
        setEndIndex(endIndex);
    }

    return (
        <div className="list">
            <ul>
                {
                    friendsList
                        .slice(startIndex, endIndex)
                        .map((friend, index) => <FriendDetails makeItStarred={makeItStarred} deleteFromList={deleteFromList} key={index} index={index} friend={friend} />)
                }
            </ul>
            <Pagination currentPage={currentIndex} totalPages={totalPages} onPageClick={onPageClick} />
        </div>
    );
}

export default List;