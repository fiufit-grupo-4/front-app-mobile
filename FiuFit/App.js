import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {SafeAreaView,View, StyleSheet} from 'react-native';
import Navigation from './src/navigation/Navigation';

class App extends React.Component {
  render() {
      return (
        <SafeAreaView style={styles.root}>
          <Navigation />
          <StatusBar style="auto" />
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
