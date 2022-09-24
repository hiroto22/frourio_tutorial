import $api from "./api/$api";
import aspida from "@aspida/fetch";

const apiClient = $api(
  aspida(undefined, {
    baseURL: "http://localhost:8888",
  })
);

export default apiClient;
