import axiosInstance from "@/services/axios-config";
import { IArticle } from "@/utils/interfaces/article.interface";
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

  async getMe() {
    const res = await axiosInstance.get("/users/me/");
    return res.data;
  }

  async getTopics() {
    const res = await axiosInstance.get("/topics/recommended");
    return res.data;
  }

  async getArticles(
    isRecommended: boolean,
    isFollowed: boolean,
    search: string
  ) {
    const res = await axiosInstance.get(
      `articles/?recommended=${isRecommended}&followed=${isFollowed}&search=${search}`
    );
    return res.data;
  }

  async getArticleById(id: string) {
    const res = await axiosInstance.get(`articles/${id}/`);
    return res.data as IArticle;
  }

  async saveArticle(article: IArticle) {
    const res = await axiosInstance.post(`articles/save/`, article);
    return res.data;
  }

  async unSaveArticle(article: IArticle) {
    const res = await axiosInstance.post("/articles/unsave", article);
    return res.data;
  }
}

const ServiceInstance = new APIServices();
export default ServiceInstance;
