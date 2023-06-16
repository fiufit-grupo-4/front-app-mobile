import React, {useEffect, useState} from "react";
import FollowList from "../../components/followers/FollowList";
import {getUser} from "../../utils/getters";
import Client from "../../client/Client";

const FollowersScreen = () => {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState({});
    const [myFollowers, setMyFollowers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        async function getUsers() {
            setLoading(true)
            setError(false)
            let userInfo = await getUser()
            setUser(userInfo)
            Client.getUsers(userInfo.access_token).then((data) => {
                setUsers(data)
                setUser(data.find((user) => user.id === userInfo.id))
                setLoading(false)
            }).catch((error) => {
                setError(true);
                setErrorMessage(error.toString());
                setLoading(false)
            })
        }
        getUsers();
    }, [])


    if (user.followers) {
        return <FollowList  followers={user.followers} allUsers={users} myId={user.id}></FollowList>

    }
    return <></>
};

export default FollowersScreen;
