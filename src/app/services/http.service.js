import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config";

axios.defaults.baseURL = configFile.apiEndpoint;

axios.interceptors.request.use(
  (config) => {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

function transformData(data) {
  return data
    ? Object.keys(data).map((key) => ({ ...data[key] }))
    : [];
}

axios.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      res.data = { content: transformData(res.data) };
    }
    return res;
  },
  (error) => {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedErrors) {
      console.error(error);
      toast.error("Something is wrong. Try it again...");
    }

    return Promise.reject(error);
  }
);

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};

export default httpService;
