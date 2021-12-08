import axios from 'axios';
import * as CONSTANTS from './constants';

export const getDevices = async () => {
  const url = `${CONSTANTS.URL}/device/`;
  const data = await fetchData(url);
  return data.hasOwnProperty('data') ? data.data : [];
};

export async function fetchData(url, timeout=4000) {
  try {
    return await axios({
      method: 'get',
      url: url,
      timeout: timeout,
    });
  } catch {
    return "Error";
  }
}