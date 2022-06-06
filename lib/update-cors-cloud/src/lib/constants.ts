type METHOD = 'GET' | 'PUT' | 'POST' | 'DELETE';

interface RestConfig {
  type: METHOD;
  url: string;
}

const ADD_CONFIG: RestConfig = { type: 'PUT', url: '/global-config/services/CorsService' };
const GET_CONFIG: RestConfig = {
  type: 'GET',
  url: 'json/global-config/services/CorsService/?_action=nextdescendents',
};
const REMOVE_CONFIG: RestConfig = { type: 'DELETE', url: '/global-config/services/CorsService' };

export { ADD_CONFIG, REMOVE_CONFIG, GET_CONFIG };
