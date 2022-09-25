import $api from "./api/$api";
import aspida from "@aspida/fetch";
// import $api from "../server/api/$api";

const apiClient = $api(
  aspida(undefined, {
    baseURL: "http://localhost:8888",
  })
);

export default apiClient;
