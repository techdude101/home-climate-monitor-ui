import axios from 'axios';
import * as CONSTANTS from './constants';

export const getLastReading = async (device_serial) => {
  const url = `${CONSTANTS.URL}/data/${device_serial}/last`;
  const data = await fetchData(url);
  return data.data;
};

export const getData = async (device_serial, start=new Date(), end=new Date()) => {
  const url = `${CONSTANTS.URL}/data/${device_serial}?start=${start.replace('Z', '')}&end=${end.replace('Z', '')}`;
  const data = await fetchData(url);
  return data.data;
};

export async function fetchData(url, timeout=10000) {
  try {
    return await axios({
      method: 'get',
      url: url,
      timeout: timeout,
    });
  } catch {
    // TODO: Add better error handling
    return "Error";
  }
}