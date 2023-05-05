import classes from "./RegisterPage.module.css";
import LayoutLoginForm from "../login/layout-login-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [validateName, setValidateName] = useState(true);
  const [validateEmail, setValidateEmail] = useState(true);
  const [validatePass, setValidatePass] = useState(true);
  const [validatePhone, setValidatePhone] = useState(true);
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.logInReducer);
  const formIsValid =
    validateName && validateEmail && validatePass && validatePhone;

  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const phoneRef = useRef();

  useEffect(() => {
    nameRef.current.focus();
  }, []);
  // Check user existed
  const isExistedUser = () => {
    const index = userList.find(
      (user) => user.email === emailRef.current.value
    );
    if (index) return true;
    else return false;
  };
  const isEmpty = (inputValue) => {
    if (inputValue.trim() === "") {
      return true;
    }
    return false;
  };
  // Check is number
  const isPhoneNumber = (inputValue) => {
    const arrNum = inputValue.trim().split("");
    console.log("check Number: ", arrNum);
    for (let i = 0; i < arrNum.length; i++) {
      if (isNaN(arrNum[i])) {
        return false;
      }
    }
    return true;
  };
  const refeshForm = () => {
    nameRef.current.value = "";
    emailRef.current.value = "";
    passRef.current.value = "";
    phoneRef.current.value = "";
  };
  const loginHandler = () => {
    navigate("/login");
  };
  const signUpHandler = (e) => {
    e.preventDefault();
    const existedUser = isExistedUser();
    if (formIsValid && existedUser) {
      alert("Email is existed, please try another email!");
      return;
    }
    if (formIsValid) {
      dispatch({
        type: "ADD_NEW_USER",
        payload: {
          name: nameRef.current.value,
          email: emailRef.current.value,
          pass: passRef.current.value,
          phone: phoneRef.current.value,
          active: false,
        },
      });
      refeshForm();
    }
  };
  const validateInput = (e) => {
    switch (e.target.name) {
      case "name":
        if (isEmpty(e.target.value)) {
          setValidateName(false);
          return;
        }
        setValidateName(true);
        break;
      case "email":
        if (isEmpty(e.target.value) || !e.target.value.includes("@")) {
          setValidateEmail(false);
          return;
        }
        setValidateEmail(true);
        break;
      case "pass":
        if (isEmpty(e.target.value) || e.target.value.length < 8) {
          setValidatePass(false);
          return;
        }
        setValidatePass(true);
        break;
      case "phone":
        if (isEmpty(e.target.value) || !isPhoneNumber(e.target.value)) {
          setValidatePhone(false);
          return;
        }
        setValidatePhone(true);
        break;
      default:
    }
  };

  return (
    <div className={classes.register}>
      <LayoutLoginForm>
        <form className={classes.form} onSubmit={signUpHandler}>
          <label>Sign Up</label>
          <input
            type="text"
            placeholder="Full Name"
            ref={nameRef}
            onBlur={validateInput}
            name={"name"}
            className={!validateName ? classes.error : ""}
          />
          {!validateName && (
            <div className={classes["error-massage"]}>
              The name is empty. Please enter name.
            </div>
          )}
          <input
            type="text"
            placeholder="Email"
            ref={emailRef}
            onBlur={validateInput}
            name={"email"}
            className={!validateEmail ? classes.error : ""}
          />
          {!validateEmail && (
            <div className={classes["error-massage"]}>
              The email is invalid, please check again
            </div>
          )}
          <input
            type="password"
            placeholder="Password"
            ref={passRef}
            onBlur={validateInput}
            name={"pass"}
            className={!validatePass ? classes.error : ""}
          />
          {!validatePass && (
            <div className={classes["error-massage"]}>
              The password is not empty and at least 8 character.
            </div>
          )}
          <input
            type="text"
            placeholder="Phone Number"
            ref={phoneRef}
            onBlur={validateInput}
            name={"phone"}
            className={!validatePhone ? classes.error : ""}
          />
          {!validatePhone && (
            <div className={classes["error-massage"]}>
              The phone number is invalid, please check again
            </div>
          )}
          <button>SIGN UP</button>
          <p>
            Login ? <span onClick={loginHandler}>Click</span>
          </p>
        </form>
      </LayoutLoginForm>
    </div>
  );
};
export default RegisterPage;
