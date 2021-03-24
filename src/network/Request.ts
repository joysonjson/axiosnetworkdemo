import {isNotEmpty} from '../utils/globalFunction';
import {prepareApiRequest} from './Index';
import {apiConstants} from '../utils/constants/apiConstants';
import {endPoints} from '../utils/constants/endPoints';
// import {actionCreators} from '../actions/actionCreators';
import {appConstants} from '../utils/constants/appConstants';

import ShowToast from '../Lib/showToast';

var loaderCount = 0,
  refresh = true;

//code to get vehicle list
export const getTodoes = (
  params: any,
  succesCallback: Function,
  errorCallback: Function,
) => {
  return commonApiWrapper(
    null,
    endPoints.todoes,
    apiConstants.get_request_type,
    null,
    null,
    params,
    null,
    succesCallback,
    errorCallback,
    true,
  );

  // return (dispatch: Function) =>
  //   commonApiWrapper(
  //     null,
  //     endPoints.config,
  //     apiConstants.get_request_type,
  //     null,
  //     null,
  //     params,
  //     null,
  //     succesCallback,
  //     errorCallback,
  //     true,
  //   );
};
const commonApiWrapper = (
  dispatch: Function,
  url: string,
  apiRequestType: String,
  contentType: String,
  requestData: any,
  params: any,
  path: any,
  successCallback: Function,
  errorCallback: Function,
  isLoader: boolean,
) => {
  // if (isLoader) {
  //   loaderCount++;
  //   showLoader(true, dispatch);
  // }
  console.log('Calling in wrpaer');

  // if (isNotEmpty(path)) url = `${url}${path}/`;

  prepareApiRequest(
    url,
    apiRequestType,
    contentType,
    params,
    requestData,
    (response: string) => handleSuccess(response, successCallback, dispatch),
    (errorMessage: string) =>
      handleError(errorMessage, errorCallback, dispatch),
    (exception: any) => handleException(exception, dispatch),
  );
};

const showLoader = (shouldShow: boolean, dispatch: any) => {
  // dispatch(actionCreators.showLoader(shouldShow));
  console.log('SHow loader with action creators');
};

const handleSuccess = (
  response: any,
  succesCallback: Function,
  dispatch: any,
) => {
  loaderCount--;
  if (loaderCount <= 0) {
    showLoader(false, dispatch);
  }
  if (response.status === 200 || response.status === 201) {
    if (succesCallback) succesCallback(response);
  } else if (response.status === 'OK') {
    if (succesCallback) succesCallback(response);
  } else {
    handelStatus(response, dispatch);
  }
};

const handleError = (
  errorMessage: string,
  errorCallback: Function,
  dispatch: any,
) => {
  loaderCount--;
  if (loaderCount <= 0) showLoader(false, dispatch);
  if (isNotEmpty(errorMessage))
    // dispatch(actionCreators.errorHandler(errorMessage));
    console.log('Show error toast masseage using toast');

  if (errorCallback && errorMessage) errorCallback(errorMessage);
};

const handleException = (exception: any, dispatch: any) => {
  loaderCount--;
  if (loaderCount <= 0) showLoader(false, dispatch);
  if (isNotEmpty(exception))
    console.log('Show error toast masseage using toast');

  // dispatch(actionCreators.exceptionHandler(exception));
};

const handelStatus = (response: any, dispatch: any) => {
  loaderCount--;
  if (loaderCount <= 0) showLoader(false, dispatch);
  if (response.status === 200) {
  } else {
    if (response.data.detail)
      handleToast(appConstants.toast_danger, response.data.detail);
    if (response.data.message)
      handleToast(appConstants.toast_danger, response.data.message);
  }
};

const handleToast = (type: string, message: string) => {
  // ShowToast(type, message);
};
