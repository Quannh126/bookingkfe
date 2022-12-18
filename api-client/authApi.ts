import { LoginPayload } from "@/models/auth";
import axiosClient from "./axiosClient";
const authApi = {
  login(payload: LoginPayload) {
    return axiosClient.post("/auth", payload);
  },

  logout() {
    return axiosClient.post("/logout");
  },
};
export default authApi;
