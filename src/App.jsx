import { RegisterPage } from "./pages/Register";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import ModalNotification from "./components/ModalNotification";
import userService from "./apis/user";
import { useAuth } from "./hooks/authHook";
import ShowRecipe from "./pages/ShowRecipe";
import Results from "./pages/Results";
import UserRecipe from "./pages/UserRecipe";
import UserInfo from "./pages/UserInfo";
import RecipeEdit from "./pages/RecipeEdit";
import UserEdit from "./pages/UserEdit";
import UserFavoriteRecipe from "./pages/UserFavoriteRecipe";
import SearchRecipes from "./pages/SearchRecipes";

const RutasContent = () => {
  const name_proyect = import.meta.env.VITE_NAME_PAGE || "";
  const { login, status, logOut, token, change } = useAuth();
  const [loading, setLoading] = useState(true);
  const [moved, setMoved] = useState(token);

  // useEffect(() => {
  //   VerifyLoggedIn();
  // }, [moved]);

  const VerifyLoggedIn = async () => {
    try {
      const resultVerify = await userService.verify();
      if (resultVerify.success) {
        login();
      } else {
        logOut();
      }
    } catch (error) {
      console.log(error);
      logOut();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    VerifyLoggedIn();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <ModalNotification />
      <Routes>
        {status ? (
          <>
            <Route path={`${name_proyect}/home`} element={<Home />} />
            <Route path={`${name_proyect}/home/:id`} element={<ShowRecipe />} />
            <Route
              path={`${name_proyect}/recipe/create`}
              element={<CreateRecipe />}
            />
            <Route
              path={`${name_proyect}/recipe/myRecipes`}
              element={<UserRecipe />}
            />
            <Route path={`${name_proyect}/results`} element={<Results />} />
            <Route path={`${name_proyect}/user/info`} element={<UserInfo />} />
            <Route path={`${name_proyect}/user/edit`} element={<UserEdit />} />
            <Route
              path={`${name_proyect}/user/favorite`}
              element={<UserFavoriteRecipe />}
            />
            <Route
              path={`${name_proyect}/recipe/edit`}
              element={<RecipeEdit />}
            />
            <Route
              path={`${name_proyect}/recipe/search`}
              element={<SearchRecipes />}
            />
          </>
        ) : (
          <>
            <Route path={`${name_proyect}/login`} element={<Login />} />
            <Route path={`${name_proyect}/home`} element={<Home />} />
            <Route path={`${name_proyect}/home/:id`} element={<ShowRecipe />} />
            <Route path={`${name_proyect}/results`} element={<Results />} />
            <Route
              path={`${name_proyect}/register`}
              element={<RegisterPage />}
            />
            <Route
              path={`${name_proyect}/recipe/search`}
              element={<SearchRecipes />}
            />
          </>
        )}
        <Route path="*" element={<Navigate to={`${name_proyect}/home`} />} />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <Provider store={store}>
      <RutasContent />
    </Provider>
  );
}

export default App;
