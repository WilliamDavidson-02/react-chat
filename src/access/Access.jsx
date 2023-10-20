import { useState } from "react";
import SubmitBtn from "../shared/SubmitBtn";

export default function Access() {
  const [loginOrRegister, setLoginOrRegister] = useState(true); // true = signUp, false = sign in.
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(ev) {
    ev.preventDefault();
    console.log(ev);
  }

  return (
    <div className="w-screen h-screen flex justify-center text-light-silver px-4">
      <div className="w-full max-w-[500px] h-full flex flex-col items-center justify-center">
        <div className="w-full mb-10">
          <h1 className="mt-8 mb-2 text-2xl lg:text-3xl">
            {loginOrRegister ? "Get started" : "Welcome back"}
          </h1>
          <p className="text-sm text-charcoal-gray-300">
            {loginOrRegister
              ? "Create a new account"
              : "Sign in to your account"}
          </p>
        </div>
        <div className="w-full flex flex-col gap-5">
          <button className="w-full flex items-center justify-center gap-2 bg-charcoal-gray-700 border border-charcoal-gray-500 px-4 py-2 rounded-lg">
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
          </button>
          <div className="w-full flex items-center gap-4">
            <span className="w-full h-[1px] bg-charcoal-gray-500"></span>
            <span>or</span>
            <span className="w-full h-[1px] bg-charcoal-gray-500"></span>
          </div>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col gap-2">
              <label className="text-sm text-charcoal-gray-300" htmlFor="email">
                Email
              </label>
              <input
                className="bg-charcoal-gray-700 border border-charcoal-gray-500 px-4 py-2 rounded-lg"
                type="text"
                id="email"
                placeholder="you@example.com"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label
                className="text-sm text-charcoal-gray-300"
                htmlFor="password"
              >
                Password
              </label>
              <div className="w-full relative max-h-[42px]">
                <input
                  className="w-full bg-charcoal-gray-700 border border-charcoal-gray-500 px-4 py-2 rounded-lg"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-[6px] border border-charcoal-gray-500 rounded-lg px-2 py-1 cursor-pointer"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            <SubmitBtn
              click={() => setLoginOrRegister(!loginOrRegister)}
              text={loginOrRegister ? "Sign Up Now" : "Sign In Now"}
            />
            <p className="text-center text-sm text-charcoal-gray-300">
              {loginOrRegister ? "Have an account? " : "Don't have an account?"}
              <span
                className="text-light-silver underline cursor-pointer"
                onClick={() => setLoginOrRegister(!loginOrRegister)}
              >
                {loginOrRegister ? "Sign In Now" : " Sign Up Now"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}