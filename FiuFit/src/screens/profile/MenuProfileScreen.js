import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';

function MenuProfileScreen({ navigation }) {

    const handleEditPassword = () => {
            // handle saving changes to user profile
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ alignItems: 'center', padding: 20, marginVertical:100 }}>
                <Image source={require('../../../assets/images/profilepic.jpeg')} style={{ width: 200, height: 200, borderRadius: 100 }} />
                <Text style={{ fontSize: 18, color: '#172D34', fontWeight: 'bold', marginTop: 20 }}>Pepito Boxeador</Text>
                <Text style={{ fontSize: 18, color: '#172D34', marginTop: 20, alignItems: 'flex-start'}}>Mail: pepitocampeon@yahoo.com</Text>
                <Text style={{ fontSize: 18, color: '#172D34', marginTop: 20,  alignItems: 'flex-start' }}>Number: 19937472342</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#DEE9F8FF', borderRadius: 20, marginHorizontal: 40, paddingVertical: 10 }} onPress={() => navigation.navigate('EditProfileScreen')}>
                <Text style={{ fontSize: 18, color: 'rgba(23,29,52,0.93)', textAlign: 'center' }}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleEditPassword}>
                <Text style={styles.buttonText}>Create New Password</Text>
            </TouchableOpacity>
        </View>
    );
}
export default MenuProfileScreen;



const styles = StyleSheet.create({
    buttonText: {
        fontSize: 18,
        color: 'rgba(23,29,52,0.93)',
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#DEE9F8FF',
        borderRadius: 20,
        paddingVertical: 10,
        marginTop:30,
        marginHorizontal: 40
    }
})