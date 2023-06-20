import axios from "axios";
import keys from "../constant/keys";

export const BASE_URL = "https://backend.spreadthankyou.com";
// "https://staging.spreadthankyou.com"
// https://backend.spreadthankyou.com
const instance = axios.create({
  timeout: 30000,
  baseURL: BASE_URL + "/api",
});

// Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    const accessToken = localStorage.getItem(keys.Preference.ACCESS_TOKEN);
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
