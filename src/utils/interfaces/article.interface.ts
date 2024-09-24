import { IUser } from "./user.interface";

export interface ITopic {
  id: number;
  name: string;
  followers: number;
  stories: number;
  followed: boolean;
}

export interface IArticle {
  id: string;
  title: string;
  content: string;
  author: IUser;
  thumbnail: string;
  claps: number;
  summary: string;
  comments: number;
  readingCount: number;
  isSaved: boolean;
  isRecommended: boolean;
  isFollowed: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
