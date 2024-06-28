import React, { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import ModalNotification from "./components/ModalNotification";
//import hooks
import { useAuth } from "./hooks/authHook";
import { useMessage } from "./hooks/messageHook";
import { useRecipe } from "./hooks/recipeHook";
//Import pages

import Home from "./pages/Home";
const UserInfo = lazy(() => import("./pages/UserInfo"));
const Login = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));
const ShowRecipe = lazy(() => import("./pages/ShowRecipe"));
const Results = lazy(() => import("./pages/Results"));
const CreateRecipe = lazy(() => import("./pages/CreateRecipe"));
const UserRecipe = lazy(() => import("./pages/UserRecipe"));
const RecipeEdit = lazy(() => import("./pages/RecipeEdit"));
const UserEdit = lazy(() => import("./pages/UserEdit"));
const UserFavoriteRecipe = lazy(() => import("./pages/UserFavoriteRecipe"));
const SearchRecipes = lazy(() => import("./pages/SearchRecipes"));

//import helpers
import { verifyLoggedIn, verifyExpiredToken } from "./helpers/stateHelper";

const RutasContent = () => {
  //hooks
  const { showNewMessage } = useMessage();
  const { login, status, logOut } = useAuth();
  const { editDataRecipe } = useRecipe();
  //usestate
  const [loading, setLoading] = useState(true);
  //variables
  const name_proyect = import.meta.env.VITE_NAME_PAGE || "";

  useEffect(() => {
    verifyLoggedIn(login, logOut).then(() => {
      setLoading(false);
    });

    setInterval(() => {
      verifyExpiredToken(showNewMessage, logOut);
    }, 10000);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <BrowserRouter>
        <ModalNotification />
        <Routes>
          {status ? (
            <>
              <Route path={`${name_proyect}/home`} element={<Home />} />
              <Route
                path={`${name_proyect}/home/:id`}
                element={<ShowRecipe />}
              />
              <Route
                path={`${name_proyect}/recipe/create`}
                element={<CreateRecipe />}
              />
              <Route
                path={`${name_proyect}/recipe/myRecipes`}
                element={<UserRecipe />}
              />
              <Route path={`${name_proyect}/results`} element={<Results />} />
              <Route
                path={`${name_proyect}/user/info`}
                element={<UserInfo />}
              />
              <Route
                path={`${name_proyect}/user/edit`}
                element={<UserEdit />}
              />
              <Route
                path={`${name_proyect}/user/favorite`}
                element={<UserFavoriteRecipe />}
              />
              <Route
                path={`${name_proyect}/recipe/edit`}
                element={
                  editDataRecipe.id !== "" ? <RecipeEdit /> : <UserRecipe />
                }
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
              <Route
                path={`${name_proyect}/home/:id`}
                element={<ShowRecipe />}
              />
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
    </Suspense>
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
