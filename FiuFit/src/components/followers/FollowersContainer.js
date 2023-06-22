import React,{useState,useEffect} from 'react';
import {Text,View, StyleSheet,TouchableOpacity} from 'react-native';
import { getUser } from '../../utils/getters';
import Client from '../../client/Client';
import FollowList from './FollowList';

const FollowersContainer = ({followers,following}) => {
    const [users, setUsers] = useState([]);
    const [myUser, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [filter, setFilter] = useState('');


    useEffect(() => {
        async function getUsers() {
            setLoading(true)
            setError(false)
            let userInfo = await getUser()
            setUser(userInfo)
            Client.getUsers(userInfo.access_token).then((data) => {
              setUsers(data)
              setLoading(false)
            }).catch((error) => {
              setError(true);
              setErrorMessage(error.toString());
              setLoading(false)
            })
            }
            getUsers();
        }, [])

    const handleFilter = (filterValue) => {
        setFilter(filterValue);
    };
    
    const notBlocked = (data) =>{
      const filteredData = data?.filter(obj => !obj.blocked);
      return filteredData?.length;
  
    }
  
  

    return (
        <View>
        <View style={styles.followersContainer}>
            <View style={styles.filterButtons}>
                <TouchableOpacity onPress={() => handleFilter(filter === 'followers' ? '' : 'followers')}>
                    <View style={styles.itemContainer}>
                        <Text style={filter === 'followers' ? styles.activeCount : styles.count}>{notBlocked(followers)}</Text>
                        <Text style={filter === 'followers' ? styles.activeLabel : styles.label}>Followers</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilter(filter === 'following' ? '' : 'following')}>
                    <View style={styles.itemContainer}>
                        <Text style={filter === 'following' ? styles.activeCount : styles.count}>{notBlocked(following)}</Text>
                        <Text style={filter === 'following' ? styles.activeLabel : styles.label}>Following</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

        { filter =='followers' && (
            <View>
              <FollowList followers={followers} allUsers={users} myId={myUser.id}></FollowList>
            </View>
        )}

        { filter =='following' && (
            <View>
              <FollowList followers={following} allUsers={users} myId={myUser.id}></FollowList>
            </View>
        )}

        </View>
    );
};

export default FollowersContainer





const styles = StyleSheet.create({
  
      followersContainer: {
        flexDirection: 'row',
        justifyContent: "center",
        
        borderTopWidth:1,
        borderBottomWidth:1,
        padding:8,
        marginBottom:10,
        marginTop:20
      },
      followersCount: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 100,
      },
      followingCount: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      filterButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    filterText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#666',
        marginLeft: 10,
    },
    activeFilterText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 10,
    },


    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal:20
      },
      itemContainer: {
        alignItems: 'center',
        marginHorizontal:45
      },
      count: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#666',
      },
      label: {
        fontSize: 16,
        fontWeight:"bold",
        color: '#666',
      },

      activeCount: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
      },
      activeLabel: {
        fontSize: 16,
        fontWeight:"bold",
        color: '#333',
      },

})