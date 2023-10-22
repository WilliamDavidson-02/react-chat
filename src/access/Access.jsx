import { useState } from "react";
import SubmitBtn from "../shared/SubmitBtn";
import Password from "./Password";
import Email from "./Email";
import LinkBtn from "../shared/LinkBtn";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import Name from "./Name";
import ErrorNotification from "../shared/ErrorNotification";
import { AnimatePresence } from "framer-motion";

export default function Access() {
  const [loginOrRegister, setLoginOrRegister] = useState("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState([]);
  const [errorNotifications, setErrorNotifications] = useState([]);

  const navigate = useNavigate();

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
        };

      axios
        .post(`/${loginOrRegister}`, dataToSend)
        .then((response) => {
          document.cookie = `token=${response.data.token}`;
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
      <div className="w-full max-w-[500px] h-full flex flex-col items-center justify-center">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
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
