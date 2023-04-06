import { SafeAreaView, StyleSheet } from 'react-native';
import Main from './src/components/Main';
import SignInScreen from './src/screens/SignIn/SignInScreen';

export default function App() {
  return (
      <SafeAreaView style= {styles.root}>
        <SignInScreen></SignInScreen>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex:1,
    backgroundColor: "F9FBFC"
  }
})

