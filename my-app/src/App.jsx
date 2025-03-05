import "./style.scss";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Item from "./Pages/Blog";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Layout from "./Components/Layout/Layout";
import Auth from "./Pages/Auth";
import Security from "./Components/Security";
import Users from "./Pages/Users";
import Profile from "./Pages/Profile";
import MyBlogs from "./Pages/MyBlog";

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <Security isSecure={false}>
                  <Layout />
                </Security>
              }
            >
              <Route
                index
                path={"/"}
                element={
                  <Security isSecure={false}>
                    <Home />
                  </Security>
                }
              />
              <Route
                path="/blogs"
                element={
                  <Security isSecure={false}>
                    <Home />
                  </Security>
                }
              />
              <Route
                path="/blogs/:blog_id"
                element={
                  <Security isSecure={false}>
                    <Item />
                  </Security>
                }
              />
              <Route
                path="/blogs/myblogs"
                element={
                  <Security>
                    <MyBlogs />
                  </Security>
                }
              />
              <Route
                path="profile"
                element={
                  <Security>
                    <Profile />
                  </Security>
                }
              />
              <Route
                path="auth"
                element={
                  <Security>
                    <Auth />
                  </Security>
                }
              />
              <Route
                path="users"
                element={
                  <Security isAdmin={true}>
                    <Users />
                  </Security>
                }
              />
              <Route
                path="*"
                element={<p className="empty">Page Not Found</p>}
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
