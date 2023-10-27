import { useEffect, useState } from "react";
import SubmitBtn from "../shared/SubmitBtn";
import Password from "./Password";
import Email from "./Email";
import LinkBtn from "../shared/LinkBtn";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import Name from "./Name";
import ErrorNotification from "../shared/ErrorNotification";
import { AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { colorPallet } from "../shared/colorPallet";
import { Github } from "lucide-react";

export default function Access() {
  const [loginOrRegister, setLoginOrRegister] = useState("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);
  const [errorNotifications, setErrorNotifications] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("token")) navigate("/chat");
    if (Cookies.get("isRegistered") === "yes") setLoginOrRegister("login");
  }, []);

  function validateFilter(test, toValidate) {
    if (test && errors.includes(toValidate)) {
      setErrors((prev) => prev.filter((error) => error !== toValidate));
      return;
    }

    if (!test && !errors.includes(toValidate)) {
      setErrors((prev) => [...prev, toValidate]);
    }
  }

  function validate(toValidate) {
    const regex = {
      email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, // requirements - one number, lowercase and uppercase letter and at least 8 characters long.
    };

    let toTest;

    switch (toValidate) {
      case "email":
        toTest = email;
        break;
      case "password":
        toTest = password;
        break;
      case "First name":
        toTest = firstName;
        break;
      default:
        toTest = lastName;
    }

    const comparisons = regex[toValidate]
      ? regex[toValidate].test(toTest)
      : toTest.length >= 2;
    validateFilter(comparisons, toValidate);
  }

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function handleSubmit(ev) {
    ev.preventDefault();

    validate("email");
    validate("password");
    if (loginOrRegister === "register") {
      validate("First name");
      validate("Last name");
    }

    if (errors.length === 0) {
      let dataToSend = {
        email: email.trim().toLocaleLowerCase(),
        password: password.trim(),
      };
      if (loginOrRegister === "register")
        dataToSend = {
          ...dataToSend,
          firstName: capitalizeFirstLetter(firstName).trim(),
          lastName: capitalizeFirstLetter(lastName).trim(),
          colorIndex: Math.floor(Math.random() * colorPallet.length),
        };

      axios
        .post(`/${loginOrRegister}`, dataToSend)
        .then((response) => {
          Cookies.set("token", `${response.data.token}`, { expires: 1 }); // expires in 1 day.
          if (
            loginOrRegister === "register" &&
            !Cookies.get("isRegister") === "yes"
          ) {
            Cookies.set("isRegistered", "yse");
          }
          navigate("/chat");
        })
        .catch((error) => {
          const { data, status } = error.response;
          if (status === 409) setErrors(["email"]);
          setErrorNotifications((prev) => [...prev, data.message]);
        });
    }
  }

  return (
    <div className="relative w-screen max-w-screen overflow-hidden h-screen flex justify-center text-light-silver px-4">
      <AnimatePresence>
        {errorNotifications.length > 0 && (
          <div className="absolute top-5 right-5 w-full max-w-[500px] flex flex-col gap-4">
            {errorNotifications.map((message, index) => {
              return (
                <ErrorNotification
                  message={message}
                  key={index}
                  index={index}
                  setErrorNotifications={setErrorNotifications}
                />
              );
            })}
          </div>
        )}
      </AnimatePresence>
      <div className="w-full max-w-[500px] h-full flex flex-col items-center justify-center mx-auto">
        <div className="w-full mb-10">
          <h1 className="mt-8 mb-2 text-2xl lg:text-3xl">
            {loginOrRegister === "register" ? "Get started" : "Welcome back"}
          </h1>
          <p className="text-sm text-charcoal-gray-300">
            {loginOrRegister === "register"
              ? "Create a new account"
              : "Sign in to your account"}
          </p>
        </div>
        <div className="w-full flex flex-col gap-5">
          <LinkBtn direction={"#"}>
            <Github />
            <span>Continue with github</span>
          </LinkBtn>
          <div className="w-full flex items-center gap-4">
            <span className="w-full h-[1px] bg-charcoal-gray-500"></span>
            <span>or</span>
            <span className="w-full h-[1px] bg-charcoal-gray-500"></span>
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {loginOrRegister === "register" && (
              <>
                <Name
                  errors={errors}
                  validate={validate}
                  name={firstName}
                  setName={setFirstName}
                  label={"First name"}
                />
                <Name
                  errors={errors}
                  validate={validate}
                  name={lastName}
                  setName={setLastName}
                  label={"Last name"}
                />
              </>
            )}
            <Email
              errors={errors}
              validate={validate}
              email={email}
              setEmail={setEmail}
            />
            <Password
              errors={errors}
              validate={validate}
              password={password}
              setPassword={setPassword}
            />
            <SubmitBtn
              text={
                loginOrRegister === "register" ? "Sign Up Now" : "Sign In Now"
              }
            />
            <p className="text-center text-sm text-charcoal-gray-300">
              {loginOrRegister === "register"
                ? "Have an account? "
                : "Don't have an account?"}
              <span
                className="text-light-silver underline cursor-pointer"
                onClick={() =>
                  setLoginOrRegister(
                    loginOrRegister === "login" ? "register" : "login"
                  )
                }
              >
                {loginOrRegister === "register"
                  ? "Sign In Now"
                  : " Sign Up Now"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
