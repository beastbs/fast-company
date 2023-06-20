import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config/apiEndpoint.json";

const http = axios.create({ // создаем instance( и будем изменять его ) класса axios
  baseURL: configFile.apiEndpoint // Передаем данные для данного instance
});

// axios.defaults.baseURL = configFile.apiEndpoint; // axios является глобальным классом, устанавливая например baseURL для axios - мы устанавливаем для всего класса

http.interceptors.request.use(
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
  return data ? Object.keys(data).map((key) => ({ ...data[key] })) : [];
}

http.interceptors.response.use(
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
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete
};

export default httpService;
