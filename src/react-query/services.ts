import axiosInstance from "@/services/axios-config";
import {
  ILoginFormInputs,
  IRegisterFormInputs,
} from "@/utils/interfaces/auth.interface";

class APIServices {
  async login(loginValue: ILoginFormInputs) {
    const res = await axiosInstance.post("/users/login/", loginValue);
    return res;
  }

  async register(registerValue: IRegisterFormInputs) {
    const res = await axiosInstance.post("/users/register/", registerValue);
    return res.data;
  }
}

const ServiceInstance = new APIServices();
export default ServiceInstance;
