import axiosInstance from "@/services/axios-config";
import {
  IArticle,
  ICommentFormFields,
} from "@/utils/interfaces/article.interface";
import {
  ILoginFormInputs,
  IRegisterFormInputs,
} from "@/utils/interfaces/auth.interface";
import { IUser } from "@/utils/interfaces/user.interface";

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
    return res.data as IUser;
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

  async createComment(articleId: string, value: ICommentFormFields) {
    const res = await axiosInstance.post(
      `/articles/${articleId}/comments`,
      value
    );
    return res.data;
  }

  async createSubComment(
    articleId: string,
    commentId: string,
    value: ICommentFormFields
  ) {
    const res = await axiosInstance.post(
      `/articles/${articleId}/comments/${commentId}/replies`,
      value
    );
    return res.data;
  }

  async updateUser(user: Partial<IUser>) {
    const res = await axiosInstance.patch("/users/update", user);
    return res.data;
  }

  async getSavedArticles() {
    const res = await axiosInstance.get("/articles/saved");
    return res.data as IArticle[];
  }

  async getMyArticles() {
    const res = await axiosInstance.get("articles/my");
    return res.data as IArticle[];
  }

  async search(query: string) {
    const res = await axiosInstance.get(`/search?query=${query}`);
    return res.data as {
      articles: IArticle[];
      users: IUser[];
    };
  }

  async createArticle(value: Partial<IArticle>) {
    const res = await axiosInstance.post("/articles", value);
    return res.data;
  }

  async deleteArticle(id: string) {
    const res = await axiosInstance.delete(`/articles/${id}`);
    return res.data;
  }
}

const ServiceInstance = new APIServices();
export default ServiceInstance;
