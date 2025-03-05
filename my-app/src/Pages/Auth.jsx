import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { fetchApi } from "../utils/fetchWrapper";
import { useDispatch } from "react-redux";
import { userData } from "../store/store";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [psd, setPsd] = useState("");
  const [cPsd, setCPsd] = useState("");
  const [errors, setErrors] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const reset = searchParams.get("reset-password");
  const nav = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e, mode) => {
    setErrors();
    fetchApi({
      url: "/auth/" + (mode == "login" ? "login" : "sign-up"),
      method: "POST",
      body: {
        email: email,
        password: psd,
        ...((mode === "sign-up" || reset) && { ["confirmPassword"]: cPsd }),
      },
    }).then((res) => {
      if (res.statusCode !== 200 && res.statusCode !== 201) {
        setErrors(res);
      } else {
        localStorage.setItem("access_token", res.access_token);
        const d = JSON.parse(atob(res.access_token.split('.')[1]));
        dispatch(userData({login: true, user_id: d?.user_id, email: d?.email, is_admin: d?.is_admin, permission: d?.permission}))
        nav("/");
      }
    });
  };

  return (
    <div>
      <form action={(e) => submitHandler(e, mode || "login")}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }} htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }} htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={psd}
            onChange={(e) => setPsd(e.target.value)}
          />
        </div>
        {mode === "sign-up" || reset ? (
          <div style={{ marginBottom: '10px' }}>
            <label style={{ marginRight: '10px' }} htmlFor="confirmPassword">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={cPsd}
              onChange={(e) => setCPsd(e.target.value)}
            />
          </div>
        ) : (
          ""
        )}
        {errors ? (errors?.errors?.length ? errors?.errors?.map(i => {
            return <li>{i.field} - {i.msg}</li>
        }) : <p>{errors.message}</p>) : ""}
        <button type="submit">{mode === "login" ? "Login" : "Sign-up"}</button>
        {!reset && (
          <p>
            <u
              onClick={() =>
                setSearchParams({ mode: "login", "reset-password": "true" })
              }
            >
              Forget Password?
            </u>
          </p>
        )}
        <p>
          {mode === "sign-up"
            ? "Already have an account ? "
            : "Create a new account ?"}{" "}
          <u
            onClick={() =>
              setSearchParams({
                mode: mode === "sign-up" ? "login" : "sign-up",
              })
            }
          >
            Click Here
          </u>{" "}
        </p>
      </form>
    </div>
  );
};

export default Auth;
