import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

//hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

//context
import { AuthProvider } from "./context/AuthContext";

//pages
import HomePage from "./pages/Home/HomePage";
//import AboutPage from "./pages/About/AboutPage";
import NavbarComponent from "./components/NavbarComponent";
import FooterComponent from "./components/FooterComponent";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import CreatePostPage from "./pages/CreatePost/CreatePostPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import SearchPage from "./pages/Search/SearchPage";
import PostPage from "./pages/Post/PostPage";
import EditPostPage from "./pages/EditPost/EditPostPage";
// import ReservaPage from "./pages/Reservas/ReservasPage";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavbarComponent />
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/posts/:id" element={<PostPage />} />
              <Route
                path="/login"
                element={!user ? <LoginPage /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <RegisterPage /> : <Navigate to="/" />}
              />
              <Route
                path="/posts/edit/:id"
                element={user ? <EditPostPage /> : <Navigate to="/login" />}
              />
              <Route
                path="/posts/create"
                element={user ? <CreatePostPage /> : <Navigate to="/login" />}
              />
              <Route
                path="/dashboard"
                element={user ? <DashboardPage /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
          <FooterComponent />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
