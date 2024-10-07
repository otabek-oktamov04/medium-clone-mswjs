import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuth } from "./auth/useAuth";
import ArticlesLayout from "./components/layouts/articles-layout/articles-layout";
import Articles from "./pages/articles/articles";
import Home from "./pages/home/home";
import ArticleView from "./pages/articles/article-view/article-view";
import UserProfile from "./pages/user-profile/user-profile";
import SearchResult from "./pages/search-result/search-result";
import ArticleEditor from "./pages/article-editor/article-editor";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Home />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ArticlesLayout>
              <Articles />
            </ArticlesLayout>
          }
        />
        <Route path="article/:id/" element={<ArticleView />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="search" element={<SearchResult />} />
        <Route path="new-article" element={<ArticleEditor />} />
        <Route path="article-edit/:articleId" element={<ArticleEditor />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
