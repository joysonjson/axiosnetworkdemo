import axios from 'axios';
import {endPoints} from '../utils/constants/endPoints';
import {apiConstants} from '../utils/constants/apiConstants';
import {objToFormData, isNotEmpty} from '../utils/globalFunction';
// import AsyncStorage from '@react-native-community/async-storage';
// import { appConstants } from '../utils/constants/appConstants';

const TIMEOUT_DURATION_IN_MILLIS = 60000;

export const defaultInstance = axios.create({
  baseURL: endPoints.base_url,
  timeout: TIMEOUT_DURATION_IN_MILLIS,
  validateStatus: function (status) {
    return status >= 200 && status < 500;
  },
});

defaultInstance.interceptors.request.use(
  async (config: any) => {
    console.log('config', config);
    let token = null;
    if (config.data) {
      if (config.data instanceof FormData) {
        config.headers[apiConstants.content_type_key] =
          apiConstants.form_data_type;
      } else {
        config.headers[apiConstants.content_type_key] =
          apiConstants.raw_data_type;
      }
    }

    return config;
  },
  (error: any) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

defaultInstance.interceptors.response.use(
  (response: any) => {
    console.log('Response:', response);

    return response;
  },
  (error: any) => {
    // Do something with request error
    return error;
  },
);

const getRequestData = (data: any, contentType: String) => {
  switch (contentType) {
    case apiConstants.raw_data_type:
      return data;
    case apiConstants.multipart_data_type:
    case apiConstants.form_data_type:
      return objToFormData(data);
  }
  return data;
};

export const prepareApiRequest = (
  url: string,
  apiRequestType: String,
  contentType: String,
  params: any,
  body: any,
  successCallback: Function,
  errorCallback: Function,
  exceptionCallback: Function,
) => {
  if (isNotEmpty(params)) body = params;
  requestApi(
    url,
    apiRequestType,
    getRequestData(body, contentType),
    successCallback,
    errorCallback,
    exceptionCallback,
  );
};

const requestApi = (
  url: string,
  apiRequestType: String,
  data: any,
  successCallback: Function,
  errorCallback: Function,
  exceptionCallback: Function,
) => {
  let promise: Promise<any> = null;
  switch (apiRequestType) {
    case apiConstants.get_request_type:
      console.log('GET Request');
      promise = defaultInstance.get(url, {params: data});
      break;
    case apiConstants.post_request_type:
      console.log('POST Request');
      promise = defaultInstance.post(url, data);
      break;
    case apiConstants.patch_request_type:
      console.log('PATCH Request');
      promise = defaultInstance.patch(url, data);
      break;
    case apiConstants.put_request_type:
      console.log('PUT Request');
      promise = defaultInstance.put(url, data);
      break;
    case apiConstants.delete_request_type:
      console.log('DELETE Request');
      promise = defaultInstance.delete(url, {data: data});
      break;
  }

  promise
    .then((response: any) => {
      // Success Condition
      if (response) {
        successCallback(response);
      } else {
        // Error Condition
        if (errorCallback) {
          errorCallback(response.status.detail);
        }
      }
    })
    .catch((ex: any) => {
      // Error Condition
      if (errorCallback) errorCallback(ex);
      if (exceptionCallback) exceptionCallback(ex);
    });
};
