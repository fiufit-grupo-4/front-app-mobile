import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const Progress = () => {
    const [searchText, setSearchText] = useState('');
    const [filter, setFilter] = useState('month');

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
            
            <View style={styles.filterButtons}>
                <TouchableOpacity onPress={() => handleFilter('month')}>
                    <Text style={filter === 'month' ? styles.activeFilterText : styles.filterText}>
                        Last Month
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilter('week')}>
                    <Text style={filter === 'week' ? styles.activeFilterText : styles.filterText}>
                        Last Week
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleFilter('day')}>
                    <Text style={filter === 'day' ? styles.activeFilterText : styles.filterText}>
                        Last Day
                    </Text>
                </TouchableOpacity>

                
            </View>

            </View>
            { (filter =='trainings' )
                ? <></>
                : <></>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor:"white",
        paddingHorizontal: 10,
        paddingVertical: 10,

    },
    searchContainer: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        backgroundColor:'white',
        height:50,
        justifyContent:"center",

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

export default Progress;
