import React from 'react';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import Global from '../Common/Global';

const httpClient = axios.create({
  baseURL: `${Global.projct.BASE_URL}`,
});

export function setDefaultHeader(token,value) {
  httpClient.defaults.headers.common['Authorization'] = `Bearer ${value}`;
  //httpClient.defaults.headers.common[token] = `Bearer ${value}`;
  
}
export async function apiCall(
  method,
  url,
  data,
  header = {
    'Content-Type': 'application/json',
  },
  ) {
    const noNetdata = {
      data :
     { message: 'Please check your internet connection',
      code: 400}
    };
    try {
      const netInfo = await NetInfo.fetch();
      if (netInfo.isConnected) {
        const res = await httpClient({
          method,
          url,
          data: data,
          headers: header,
          withCredentials: false,
        });
        return res;
      } else {
        return noNetdata;
      }
    } catch (error) {
      if (error.response.data) {
        const data = error.response.data;
        return {data};
      } else {
        return error;
      }
  }
}
