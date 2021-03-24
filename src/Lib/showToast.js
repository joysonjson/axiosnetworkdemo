import {Toast} from 'native-base';

const ShowToast = (type, message) => {
  return Toast.show({
    text: message,
    duration: 5000,
    type: type,
    position: 'top',
    style: {
      borderRadius: 3,
      margin: 5,
      marginTop: 40,
    },
  });
};

export default ShowToast;
