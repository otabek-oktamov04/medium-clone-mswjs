import { useAuth } from "@/auth/useAuth";
import {
  ILoginFormInputs,
  IRegisterFormInputs,
} from "@/utils/interfaces/auth.interface";
import { useMutation } from "@tanstack/react-query";
import APIServices from "./services";

const useLogin = () => {
  const { login } = useAuth();
  return useMutation({
    mutationFn: (loginValue: ILoginFormInputs) => APIServices.login(loginValue),
    onSuccess: (response) => {
      const { token } = response.data;
      login(token);
    },
  });
};

const useRegister = () => {
  const { login } = useAuth();
  return useMutation({
    mutationFn: (registerValue: IRegisterFormInputs) =>
      APIServices.register(registerValue),
    onSuccess: (response) => {
      const { token } = response;
      login(token);
    },
  });
};

export { useLogin, useRegister };
