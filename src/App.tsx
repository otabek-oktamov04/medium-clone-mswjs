import "./App.css";
import { useAuth } from "./auth/useAuth";
import ArticlesLayout from "./components/layouts/articles-layout/articles-layout";
import Articles from "./pages/articles/articles";
import Home from "./pages/home/home";

function App() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <ArticlesLayout>
      <Articles />
    </ArticlesLayout>
  ) : (
    <Home />
  );
}

export default App;
