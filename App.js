/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {getTodoes} from './src/network/Request';
const App = () => {
  useEffect(() => {
    console.log('Calling api');
    getTodoes(
      {},
      res => {
        console.log('sucess', res.data);
      },
      err => {
        console.log('error api', err);
      },
    );
  }, []);
  return (
    <Text>
      JDFKJSDKJBFJBDSJBFKJBDFKJBDFJKBDFBSDKFBJKBFJKBDSJKFBJKBFJKDSBF
      JDFKJSDKJBFJBDSJBFKJBDFKJBDFJKBDFBSDKFBJKBFJKBDSJKFBJKBFJKDSBF
      JDFKJSDKJBFJBDSJBFKJBDFKJBDFJKBDFBSDKFBJKBFJKBDSJKFBJKBFJKDSBF
      JDFKJSDKJBFJBDSJBFKJBDFKJBDFJKBDFBSDKFBJKBFJKBDSJKFBJKBFJKDSBF
      JDFKJSDKJBFJBDSJBFKJBDFKJBDFJKBDFBSDKFBJKBFJKBDSJKFBJKBFJKDSBF
    </Text>
  );
};

export default App;
