import React from 'react';
import {
  Image,
  StyleSheet,Dimensions
} from 'react-native';
const {width,height} = Dimensions.get("window")


import FiuFitLogo from '../../../assets/images/fiticon.png';

const Logo = () => {
    return (
        <Image
            source={FiuFitLogo}
            style={[styles.logo, {height: height * 0.3}]}
            resizeMode="contain"
        />
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        
      },
    logo: {
      width: '70%',
      maxWidth: 300,
      maxHeight: 200,
    },
});

export default Logo;