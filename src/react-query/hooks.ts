import { useAuth } from "@/auth/useAuth";
import {
  ILoginFormInputs,
  IRegisterFormInputs,
} from "@/utils/interfaces/auth.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import APIServices from "./services";
import { IArticle } from "@/utils/interfaces/article.interface";

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

const useGetMe = () => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: () => APIServices.getMe(),
    retryOnMount: false,
  });
};

const useGetTopics = () => {
  return useQuery({
    queryKey: ["topics"],
    queryFn: () => APIServices.getTopics(),
  });
};

const useGetArticles = (
  isRecommended: boolean,
  isFollowed: boolean,
  search: string
) => {
  return useQuery({
    queryKey: [`articles${isRecommended}${isFollowed}${search}`],
    queryFn: () => APIServices.getArticles(isRecommended, isFollowed, search),
  });
};

const useGetArticleById = (id: string) => {
  return useQuery({
    queryKey: [`article${id}`],
    queryFn: () => APIServices.getArticleById(id),
  });
};

const useSaveArticle = () => {
  return useMutation({
    mutationFn: (value: IArticle) => APIServices.saveArticle(value),
  });
};

const useUnSaveArticle = () => {
  return useMutation({
    mutationFn: (value: IArticle) => APIServices.unSaveArticle(value),
  });
};

export {
  useLogin,
  useRegister,
  useGetMe,
  useGetTopics,
  useGetArticles,
  useGetArticleById,
  useSaveArticle,
  useUnSaveArticle,
};
