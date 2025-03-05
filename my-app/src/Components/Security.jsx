import React, { Children, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router";
import { userData } from "../store/store";

const Security = (props) => {
  const { children, isSecure = true, isAdmin = false } = props;
  const nav = useNavigate();
  const token = localStorage.getItem("access_token");
  const data = token ? JSON.parse(atob(token?.split(".")[1])) : false;

  useEffect(() => {
    if (
      window.location.pathname === "/auth" &&
      token &&
      data.exp > new Date().getTime() / 1000
    ) {
      nav("/");
    } else if (
      (data.exp < new Date().getTime() / 1000 || !token) &&
      window.location.pathname !== "/auth" &&
      isSecure
    ) {
      localStorage.removeItem("access_token");
      nav("/auth?mode=login");
    }
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData);
  
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const data = token ? JSON.parse(atob(token?.split(".")[1])) : false;
    if (token && data?.exp > new Date().getTime() / 1000 && !user.login) {
      dispatch(
        userData({ login: true, user_id: data.user_id, email: data.email,is_admin: data?.is_admin, permission: data?.permission })
      );
    }
  }, []);
  if(isAdmin) {
    if(!user.is_admin) {
      return <p>You are not authorized to access</p>
    }
    return children
  }
  
  return !isSecure ? children : (isSecure && user.login) || window.location.pathname === '/auth' ? children : <p>Loading...</p>;
};

export default Security;
