import "./style.scss";
import { NavLink, Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { userInitialState } from "../../store/store";

const Layout = () => {
  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.removeItem('access_token');
    dispatch(userData(userInitialState));
  }
  return (
    <>
      <nav className="app-header">
        <h2>
          <NavLink to={"/"}>My App</NavLink>
        </h2>
        <div>
          {userData?.login ? <NavLink
            to="/blogs/myblogs"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            My Blogs
          </NavLink>: ""}
          {userData?.login ? <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Profile
          </NavLink> :""}
          {userData?.login && userData?.is_admin ? <NavLink
            to="/users"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            All Users
          </NavLink> :""}
          <NavLink
            to={"/auth?mode=login"}
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={logoutHandler}
          >
            {!userData?.login ? "Login": "Logout"}
          </NavLink>
        </div>
      </nav>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
