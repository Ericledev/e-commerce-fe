import LayoutLoginForm from "../login/layout-login-form";
import classes from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const [validEmail, setValidEmail] = useState(true);
  const [validPass, setValidPass] = useState(true);
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.logInReducer);
  const emailRef = useRef();
  const passRef = useRef();
  const validForm = validEmail && validPass;
  const navigate = useNavigate();
  const signUpHandler = () => {
    navigate("/register");
  };
  useEffect(() => {
    dispatch({ type: "ACTIVE_LOGIN_PAGE" });
    emailRef.current.focus();
  }, [dispatch]);
  // check empty
  const isEmpty = (inputValue) => {
    if (inputValue.trim() === "") {
      return true;
    }
    return false;
  };
  // find user, will return user othewire undefined
  const findUser = () => {
    const user = userList.find((user) => user.email === emailRef.current.value);
    return user;
  };
  const signInHandler = (e) => {
    e.preventDefault();
    const user = findUser();

    // check existed user
    if (validForm && !user) {
      alert("User name is not found. Please re-enter or click sign up");
      passRef.current.value = "";
      return;
    }
    // check pass of user
    if (validForm && user && !(user.pass === passRef.current.value)) {
      alert("Wrong password. Please check again");
      passRef.current.value = "";
      return;
    }
    if (validForm && user && user.pass === passRef.current.value) {
      dispatch({ type: "ON_LOGIN", payload: { email: user.email } });
      navigate("/");
      return;
    }
  };
  const handlingOnBlurEmail = (e) => {
    if (isEmpty(e.target.value) || !e.target.value.includes("@")) {
      setValidEmail(false);
      return;
    }
    setValidEmail(true);
  };
  const handlingOnBlurPass = (e) => {
    if (isEmpty(e.target.value) || e.target.value.length < 8) {
      setValidPass(false);
      return;
    }
    setValidPass(true);
  };
  return (
    <div className={classes.login}>
      <LayoutLoginForm>
        <form className={classes.form} onSubmit={signInHandler}>
          <label>Sign In</label>
          <input
            type="text"
            placeholder="Email"
            ref={emailRef}
            onBlur={handlingOnBlurEmail}
            className={!validEmail ? classes.error : ""}
          />
          {!validEmail && (
            <div className={classes["error-massage"]}>
              The email is invalid, please check again
            </div>
          )}
          <input
            type="password"
            placeholder="Password"
            ref={passRef}
            onBlur={handlingOnBlurPass}
            className={!validPass ? classes.error : ""}
          />
          {!validPass && (
            <div className={classes["error-massage"]}>
              The password is not empty and at least 8 character.
            </div>
          )}
          <button className={!validForm ? classes["invalid-form"] : ""}>
            SIGN IN
          </button>
          <p>
            Create an account? <span onClick={signUpHandler}>Sign up</span>
          </p>
        </form>
      </LayoutLoginForm>
    </div>
  );
};
export default LoginPage;
