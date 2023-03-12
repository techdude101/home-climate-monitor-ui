import axios from 'axios';
import * as CONSTANTS from './constants';

export const getDevices = async () => {
  const url = `${CONSTANTS.URL}/device/`;
  const data = await fetchData(url);
  return data.hasOwnProperty('data') ? data.data : [];
};

export const addDevice = async (serial, description, key) => {
  const url = `${CONSTANTS.URL}/device/create`;
  const headers = {
    'Content-Type': 'application/json',
    'X-API-KEY': key
  }
  try {
    return await axios.post(url, { serial: serial, description: description }, { headers: headers }, { timeout: 10000 });
  } catch {
    return "Error";
  }
};

export async function fetchData(url, timeout=10000) {
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
