import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TrainingFilters from './TrainingFilters';
import UserFilters from './UserFilters';
import { AntDesign } from '@expo/vector-icons'; 

export const SearchScreen = () => {
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('trainings');

    const handleSearch = () => {
        // Handle search logic here
        console.log('Searching for:', searchText, 'with filter:', filter);
    };

    const handleClear = () => {
        // Clear search text and filter
        setSearchText('');
        setFilter(null);
    };

    const handleFilter = (filterValue) => {
        // Set the selected filter
        setFilter(filterValue);
    };

    return (
        <View style={styles.container}>
        <View style={styles.searchContainer}>
            <View style={styles.searchBox}>
                <MaterialCommunityIcons name="magnify" color='gray' size={26} />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#999"
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
                <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
                    <Icon name="times" size={10} style={{ color: '#999' }} />
                </TouchableOpacity>
            </View>
            <View style={styles.filterButtons}>
                <TouchableOpacity onPress={() => handleFilter('trainings')}>
                    <Text style={filter === 'trainings' ? styles.activeFilterText : styles.filterText}>
                        Trainings
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilter('trainers')}>
                    <Text style={filter === 'trainers' ? styles.activeFilterText : styles.filterText}>
                        Users
                    </Text>
                </TouchableOpacity>

                
            </View>

            </View>
            { (filter =='trainings' )
                ? <TrainingFilters search = {searchText}/>
                : <UserFilters search = {searchText} />
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        marginHorizontal: 5,
        
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    searchContainer: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        backgroundColor:'#91AED4',
        height:50
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginLeft:5,
        borderRadius: 5,
        flex: 1,
        paddingHorizontal: 10,
    },
    searchInput: {
        fontSize: 16,
        fontWeight: '400',
        color: '#333',
        flex: 1,
        marginLeft: 10,
    },
    clearButton: {
        marginLeft: 10,
    },
    filterButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
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
});

export default SearchScreen;
