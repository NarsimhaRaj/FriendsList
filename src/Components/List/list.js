import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useImperativeHandle, useState } from 'react';
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
            <div className="star" onClick={() => makeItStarred(index)} >
                <FontAwesomeIcon className={friend.starred ? "yellow-star" : "normal-star"} icon={faStar} />
            </div>
            <div className="delete" onClick={() => deleteFromList(index)}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </div>
        </li>
    );
}

const List= React.forwardRef(({ searchVal, myFriendsList }, ref) => {

    var [friendsList, setFriendsList] = useState(myFriendsList);
    var [currentIndex, setCurrentIndex] = useState(1);
    var [totalPages, setTotalPages] = useState(() => (friendsData.data.length / 4));
    var [friendsListCopy, setFriendsListCopy] = useState(friendsData.data);

    useImperativeHandle(ref,()=>({
        updateFriendsList : (searchText)=>{
            let friend = {
                "name": searchText,
                "id": friendsList.length,
                "city": "",
                "starred": false
              }
              let list = [...friendsListCopy];
              list.push(friend);
              setFriendsList(list);
              setFriendsListCopy(list);
              let numOfPages = Math.ceil(list.length / 4);
              setTotalPages(numOfPages);
        }
    })); 

    const sortByStarred = function (list) {
        let sortedList = list.sort((a, b) => a.starred ? -1 : (b.starred ? 1 : 0));
        setFriendsList(sortedList);
        setFriendsListCopy(list);
    }

    const filterByName = function (list) {
        var newlist = list.filter((item) => item["name"].toLowerCase().indexOf(searchVal) !== -1);
        setFriendsList([...newlist]);
        let numOfPages = Math.ceil(newlist.length / 4);
        setTotalPages(numOfPages);
    }

    const makeItStarred = function (id) {
        let list = [...friendsList];
        let friend = list[id];
        friend["starred"] = !friend["starred"];
        sortByStarred(list);
    }

    const deleteFromList = function (index) {
        let list = [...friendsList];
        list.splice(index, 1);
        setFriendsList(list);
        setFriendsListCopy(list);
        if(list.length%4==0){
            setCurrentIndex((list.length/4));
        }
        let numOfPages = Math.ceil(list.length / 4);
        setTotalPages(numOfPages);
        return list;
    }

    useEffect(() => {
        let list = [...friendsListCopy];
        filterByName(list);        
    }, [searchVal]);

    const onPageClick = function (index) {
        setCurrentIndex(index);
    }

    return (
        <div className="list">
            <ul>
                {
                    friendsList
                        .map((friend, index) => {
                            let startIndex = (currentIndex - 1) * 4;
                            if (startIndex < friendsList.length) {
                                let endIndex = friendsList.length > (startIndex + 4) ? (startIndex + 4) : friendsList.length;
                                if (startIndex <= index && index < endIndex) {
                                    return <FriendDetails makeItStarred={makeItStarred} index={index} deleteFromList={deleteFromList} key={index} friend={friend} />
                                }
                                return null;
                            }
                            return null;
                        })
                }
            </ul>
            <Pagination currentPage={currentIndex} totalPages={totalPages} onPageClick={onPageClick} />
        </div>
    );
});

export default List;