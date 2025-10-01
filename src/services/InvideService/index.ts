import axiosInstance from "../instance";
import { IReservePayload } from "./types";

// GET /api/verifyCode?code={code}, returns 200 if okay
// GET /api/isEmailUsed?email={email} returns 200 if email has not been used
// GET /api/isWalletUsed?wallet={wallet} returns 200 if wallet has not been used
// POST /api/reserve, with payload { code, email, wallet address, signature }, returns 200,

class InvideService {
  static async verifyCode(code: string) {
    const response = await axiosInstance.get(`/api/verifyCode?code=${code}`);
    return response.data;
  }

  static async isEmailUsed(email: string) {
    const response = await axiosInstance.get(`/api/isEmailUsed?email=${email}`);
    return response.data;
  }

  static async isWalletUsed(wallet: string) {
    const response = await axiosInstance.get(`/api/isWalletUsed?wallet=${wallet}`);
    return response.data;
  }

  static async reserve(payload: IReservePayload) {
    const response = await axiosInstance.post("/api/reserve", payload);
    return response.data;
  }
}

export default InvideService;
