import React from 'react';
import DateHead from './components/DateHead';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

function App() {
  const today = new Date();
  console.log(today);
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView>
          <DateHead date={today} />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

export default App;
