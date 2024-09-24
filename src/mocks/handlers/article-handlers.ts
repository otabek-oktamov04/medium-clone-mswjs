import { http, HttpResponse } from "msw";
import articles from "../data/articles.json";

const articlesList = articles.articles || [];

const BASE_URL = "https://medium-api.com";

export const articleHandlers = [
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
];
