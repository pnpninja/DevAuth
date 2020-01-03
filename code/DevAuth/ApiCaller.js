import _ from 'lodash';
const axios = require('axios');

const HOST = 'production' === process.env.NODE_ENV ? 'http://localhost:3030' : 'http://172.20.10.5:8000';

const defaultInstance = {
  baseURL: HOST,
  timeout: 10000,
}

export default class ApiCaller {
  static getHOST() {
    return HOST;
  }

  static get(route, instance, config = false) {
    const request = axios.create(Object.assign({}, defaultInstance, instance));
    return request.get(route, config);
  }

  static post(route, data, instance, config = false) {
    const request = axios.create(Object.assign({}, defaultInstance, instance));
    return request.post(route, data, config);
  }

  static update(route, data, instance, config = false) {
    const request = axios.create(Object.assign({}, defaultInstance, instance));
    return request.patch(route, data, config);
  }

  static delete(route, instance, config = false) {
    const request = axios.create(Object.assign({}, defaultInstance, instance));
    return request.delete(route, config);
  }
}