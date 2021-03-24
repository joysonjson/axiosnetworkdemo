import {Dimensions, Platform, Linking} from 'react-native';
import {appConstants} from './constants/appConstants';
import {colors} from './constants/colors';

export const WindowWidth = Dimensions.get('window').width;
export const WindowHeight = Dimensions.get('window').height;

export const isAndroid = () => {
  return Platform.OS === appConstants.device_android;
};

export const isIos = () => {
  return Platform.OS === appConstants.device_ios;
};

export const goToNextInput = (reference, context, isClass = true) => {
  if (isClass) {
    context[reference] ? context[reference].current.focus() : null;
  } else {
    reference.current.focus();
  }
};

export const goToBack = (key, reference, context) => {
  return key === 'Backspace' && context[reference]
    ? context[reference].current.focus()
    : null;
};

export const elevationShadowStyle = elevation => {
  return {
    elevation,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 0.5 * elevation},
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation,
  };
};

export const emptyFunction = () => {};

export const createReducer = (initialState, handlers) => {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

export const objToFormData = rawData => {
  let formData = new FormData();
  if (rawData && rawData != null && typeof rawData === 'object') {
    Object.keys(rawData).map((item, index) => {
      formData.append(item, rawData[item]);
    });
  }
  return formData;
};

export const isNotEmpty = data => {
  return data !== null && data !== undefined && data !== '';
};

/**
 * Moment
 */

export const diffHours = (dt2, dt1) => {
  console.log(dt2, dt1);
  var diff = dt2.getHours() - dt1.getHours();
  return Math.abs(Math.round(diff));
};
