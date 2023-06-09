import httpService from "./http.service";
const userEndpoint = "users/";

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },
  delete: async (id) => {
    const { data } = await httpService.delete(userEndpoint + id);
    return data;
  }
};

export default userService;
