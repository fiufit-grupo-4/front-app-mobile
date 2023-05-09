import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet} from 'react-native';
import Navigation from './src/navigation/Navigation';
import { firebase } from './src/config/firebase';

class App extends React.Component {
  render() {
      return (
        <SafeAreaView style={styles.root}>
          <StatusBar style="auto" />
                <Navigation/>
        </SafeAreaView>
      )
  }
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
});

export default App;
