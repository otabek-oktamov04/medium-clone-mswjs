import "./App.css";
import { useAuth } from "./auth/useAuth";
import Home from "./pages/home/home";

function App() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <p>Articles</p> : <Home />;
}

export default App;
