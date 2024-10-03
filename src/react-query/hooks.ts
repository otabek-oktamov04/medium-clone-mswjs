import { useAuth } from "@/auth/useAuth";
import {
  ILoginFormInputs,
  IRegisterFormInputs,
} from "@/utils/interfaces/auth.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import APIServices from "./services";
import {
  IArticle,
  ICommentFormFields,
} from "@/utils/interfaces/article.interface";
import { IUser } from "@/utils/interfaces/user.interface";

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

const useComment = () => {
  return useMutation({
    mutationFn: ({
      id,
      comment,
    }: {
      id: string;
      comment: ICommentFormFields;
    }) => APIServices.createComment(id, comment),
  });
};

const useCreateSubComment = () => {
  return useMutation({
    mutationFn: ({
      articleId,
      commentId,
      comment,
    }: {
      articleId: string;
      commentId: string;
      comment: ICommentFormFields;
    }) => APIServices.createSubComment(articleId, commentId, comment),
  });
};

const useUpdateUser = () => {
  const { refetch } = useGetMe();
  return useMutation({
    mutationFn: (user: Partial<IUser>) => APIServices.updateUser(user),
    onSuccess: () => refetch(),
  });
};

const useGetSavedArticles = () => {
  return useQuery({
    queryKey: [`savedArticles`],
    queryFn: () => APIServices.getSavedArticles(),
  });
};

const useGetMyArticles = () => {
  return useQuery({
    queryKey: [`myarticles`],
    queryFn: () => APIServices.getMyArticles(),
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
  useComment,
  useCreateSubComment,
  useUpdateUser,
  useGetSavedArticles,
  useGetMyArticles,
};
