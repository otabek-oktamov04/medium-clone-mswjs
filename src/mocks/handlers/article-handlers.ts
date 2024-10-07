import { http, HttpResponse } from "msw";
import articles from "../data/articles.json";
import { IArticle, IComment } from "@/utils/interfaces/article.interface";
import { registeredUsers } from "./handlers";

const articlesList = articles.articles || [];

const BASE_URL = "https://medium-api.com";

export const articleHandlers = [
  // CREATE ARTICLE
  http.post(`${BASE_URL}/articles`, async ({ request }) => {
    const newArticleData = (await request.json()) as IArticle;

    const newArticle = {
      id: `${Date.now()}`,
      title: newArticleData.title,
      content: newArticleData.content,
      author: newArticleData.author,
      thumbnail: newArticleData.thumbnail || "",
      isSaved: false,
      recommended: false,
      followed: false,
      claps: 0,
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      summary: "",
      readingCount: 0,
      tags: [""],
    };

    articlesList.push(newArticle);

    return HttpResponse.json(
      { message: "Article created successfully", article: newArticle },
      { status: 201 }
    );
  }),

  // UPDATE ARTICLE
  http.put(`${BASE_URL}/articles/:id`, async ({ params, request }) => {
    const article = articlesList.find((article) => article.id === params.id);

    if (!article) {
      return HttpResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    const updatedData = (await request.json()) as IArticle;

    article.title = updatedData.title || article.title;
    article.content = updatedData.content || article.content;
    article.summary = updatedData.summary || article.summary;
    article.thumbnail = updatedData.thumbnail || article.thumbnail;
    article.updatedAt = new Date().toISOString();

    return HttpResponse.json(
      { message: "Article updated successfully", article },
      { status: 200 }
    );
  }),

  // DELETE ARTICLE
  http.delete(`${BASE_URL}/articles/:id`, async ({ params }) => {
    const articleIndex = articlesList.findIndex(
      (article) => article.id === params.id
    );

    if (articleIndex === -1) {
      return HttpResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    articlesList.splice(articleIndex, 1);

    return HttpResponse.json(
      { message: "Article deleted successfully" },
      { status: 200 }
    );
  }),

  http.get(`${BASE_URL}/search`, async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("query")?.toLowerCase();

    if (!searchTerm) {
      return HttpResponse.json(
        { message: "Search query is missing" },
        { status: 400 }
      );
    }

    // Search articles by title
    const matchingArticles = articlesList.filter((article) =>
      article.title.toLowerCase().includes(searchTerm)
    );

    // Search users/authors by firstName and lastName
    const matchingUsers = registeredUsers.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm)
    );

    if (matchingArticles.length === 0 && matchingUsers.length === 0) {
      return HttpResponse.json(
        { message: "No articles or users found matching the query" },
        { status: 404 }
      );
    }

    return HttpResponse.json(
      {
        articles: matchingArticles,
        users: matchingUsers,
      },
      { status: 200 }
    );
  }),

  // GET ARTICLES
  http.get(`${BASE_URL}/articles/saved`, async () => {
    const savedArticles = articlesList.filter((article) => article.isSaved);
    return HttpResponse.json(savedArticles, { status: 200 });
  }),

  http.get(`${BASE_URL}/articles/my`, async ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return HttpResponse.json(
        { message: "Authorization header missing or invalid" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1]; // Extract the token from the header
    const user = registeredUsers.find((user) => user.token === token);

    if (!user) {
      return HttpResponse.json(
        { message: "Invalid token or user not found" },
        { status: 401 }
      );
    }

    // Assuming articles have an authorId property
    const userArticles = articlesList.filter(
      (article) => article.author.id === user.id
    );

    return HttpResponse.json(userArticles, { status: 200 });
  }),

  // GET ARTICLES
  http.get(`${BASE_URL}/articles`, async ({ request }) => {
    const url = new URL(request.url);
    const recommended = url.searchParams.get("recommended");
    const followed = url.searchParams.get("followed");
    const search = url.searchParams.get("search");

    let filteredArticles = articlesList;

    // Filter by recommended status
    if (recommended === "true") {
      filteredArticles = filteredArticles.filter(
        (article) => article.recommended
      );
    }

    // Filter by followed status
    if (followed === "true") {
      filteredArticles = filteredArticles.filter((article) => article.followed);
    }

    // Search by title or author name
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm) ||
          article.author.firstName.toLowerCase().includes(searchTerm)
      );
    }

    return HttpResponse.json(filteredArticles, { status: 200 });
  }),

  // GET ARTICLE BY ID
  http.get(`${BASE_URL}/articles/:id`, async ({ params }) => {
    const article = articlesList.find((article) => article.id === params.id);

    if (!article) {
      return HttpResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    return HttpResponse.json(article, { status: 200 });
  }),

  // SAVE ARTICLE
  http.post(`${BASE_URL}/articles/save`, async ({ request }) => {
    const articleData = await request.json();

    const { id } = articleData as { id: string };

    const article = articlesList?.find((article) => article.id === id);

    if (!article) {
      return HttpResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    article.isSaved = true; // Mark article as saved
    return HttpResponse.json(
      { message: "Article saved successfully", article },
      { status: 200 }
    );
  }),

  // UNSAVE ARTICLE
  http.post(`${BASE_URL}/articles/unsave`, async ({ request }) => {
    const articleData = await request.json();

    const { id } = articleData as { id: string };
    const article = articlesList.find((article) => article.id === id);

    if (!article) {
      return HttpResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    article.isSaved = false; // Mark article as unsaved
    return HttpResponse.json(
      { message: "Article unsaved successfully", article },
      { status: 200 }
    );
  }),

  // ADD CLAPS
  http.post(`${BASE_URL}/articles/:id/clap`, async ({ params }) => {
    const article = articlesList.find((article) => article.id === params.id);

    if (!article) {
      return HttpResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    article.claps += 1; // Increment claps
    return HttpResponse.json(
      { message: "Clap added successfully", claps: article.claps },
      { status: 200 }
    );
  }),

  // ADD COMMENT TO AN ARTICLE
  http.post(
    `${BASE_URL}/articles/:id/comments`,
    async ({ params, request }) => {
      const article = articlesList.find((article) => article.id === params.id);

      if (!article) {
        return HttpResponse.json(
          { message: "Article not found" },
          { status: 404 }
        );
      }

      const commentData = await request.json();

      const { text, author } = commentData as IComment;
      const newComment = {
        id: `${Date.now()}`, // simple ID generation based on timestamp
        text: text,
        author: author,
        createdAt: new Date().toISOString(),
        replies: [],
      };

      // Add the new comment to the article's comments array
      article.comments = [...(article.comments || []), newComment];

      return HttpResponse.json(
        { message: "Comment added successfully", comment: newComment },
        { status: 201 }
      );
    }
  ),

  // ADD REPLY TO A COMMENT
  http.post(
    `${BASE_URL}/articles/:id/comments/:commentId/replies`,
    async ({ params, request }) => {
      const article = articlesList.find((article) => article.id === params.id);

      if (!article) {
        return HttpResponse.json(
          { message: "Article not found" },
          { status: 404 }
        );
      }

      const commentIndex = article.comments.findIndex(
        (comment) => comment.id === params.commentId
      );

      if (commentIndex === -1) {
        return HttpResponse.json(
          { message: "Comment not found" },
          { status: 404 }
        );
      }

      const replyData = await request.json();

      const { text, author } = replyData as IComment;
      const newReply = {
        id: `${Date.now()}-${Math.random().toString(36).substring(7)}`, // unique ID for reply
        text: text,
        author: author,
        createdAt: new Date().toISOString(),
      };

      // Add the new reply to the specified comment's replies array
      article.comments[commentIndex].replies = [
        ...(article.comments[commentIndex].replies || []),
        newReply,
      ];

      return HttpResponse.json(
        { message: "Reply added successfully", reply: newReply },
        { status: 201 }
      );
    }
  ),
];
