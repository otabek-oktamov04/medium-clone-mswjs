import { IUser } from "./user.interface";

export interface ITopic {
  id: number;
  name: string;
  followers: number;
  stories: number;
  followed: boolean;
}

export interface IComment {
  id: string;
  text: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    info: string;
  };
  createdAt: Date;
  replies?: IComment[];
}

export interface IArticle {
  id: string;
  title: string;
  content: string;
  author: IUser;
  thumbnail: string;
  claps: number;
  summary: string;
  comments: IComment[];
  readingCount: number;
  isSaved: boolean;
  isRecommended: boolean;
  isFollowed: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICommentFormFields {
  text: string;
  author: IUser;
}
