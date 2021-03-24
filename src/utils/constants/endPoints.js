import {appConstants} from './appConstants';

const current_flavour = appConstants.flavour_production;
// const flavour_staging = appConstants.flavour_staging;

const getBaseConfig = flavour => {
  let obj = {base_url: ''};
  switch (flavour) {
    case appConstants.flavour_dev:
      obj.base_url = 'https://api.charzer.com/';
      break;
    case appConstants.flavour_staging:
      obj.base_url = 'https://qa-api.charzer.com/';
      break;
    case appConstants.flavour_production:
      obj.base_url = 'https://jsonplaceholder.typicode.com/';
      break;
  }
  return obj;
};

export const endPoints = {
  ...getBaseConfig(current_flavour),
  todoes: 'todos',
  config: 'config/app-global/',
};
