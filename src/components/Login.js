import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const initialFormState = {
  name: "",
  email: "",
  password: "",
};

const initialErrorState = {
  name: "",
  email: "",
  password: "",
  general: "",
};

const initialAuthFieldState = {
  email: false,
  password: false,
};

const Login = ({ showToast }) => {
  const user = useSelector((state) => state.user.user);

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
  const [authFieldErrors, setAuthFieldErrors] = useState(initialAuthFieldState);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const requiredFields = isSignUp
    ? ["name", "email", "password"]
    : ["email", "password"];

  const isFormComplete = requiredFields.every(
    (field) => formData[field].trim() !== "",
  );
  if (user) {
    return <Navigate to={"/cart"} />;
  }

  const focusField = (field) => {
    const fieldMap = {
      name: nameRef,
      email: emailRef,
      password: passwordRef,
    };

    fieldMap[field]?.current?.focus();
  };

  const getAuthErrorDetails = (error) => {
    const code = error.code;
    let message = "";
    let field = "";
    let fields = {
      email: false,
      password: false,
    };

    if (code === "auth/invalid-credential") {
      message = "Either this email is not registered or the password is incorrect.";
      fields = {
        email: true,
        password: true,
      };
    } else if (code === "auth/invalid-email") {
      message = "Please enter a valid email address.";
      field = "email";
      fields.email = true;
    } else if (code === "auth/email-already-in-use") {
      message = "This email is already registered. Please login.";
      field = "email";
      fields.email = true;
    } else if (code === "auth/weak-password") {
      message = "Password must be at least 6 characters.";
      field = "password";
      fields.password = true;
    } else if (code === "auth/too-many-requests") {
      message = "Too many failed attempts. Try again later.";
    } else {
      message = "Something went wrong. Please try again.";
    }

    return { message, field, fields };
  };

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      const user = userCredential.user;
      console.log("user", user);
      showToast("Account created successfully");
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("ERROR CODE:", error.code);
      const code = error.code;
      const errorMessage = error.message;
      const { message, field, fields } = getAuthErrorDetails(error);
      console.log(code, errorMessage);
      setAuthFieldErrors(fields);
      setErrors((prev) => ({
        ...prev,
        general: message,
      }));
      if (field) {
        focusField(field);
      }
    }
  };

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      const user = userCredential.user;
      console.log("User after Sigin", user);
      showToast("Logged in successfully");
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("ERROR CODE:", error.code);
      const code = error.code;
      const errorMessage = error.message;
      const { message, field, fields } = getAuthErrorDetails(error);
      console.log("User Failed Sigin ", code, errorMessage);
      setAuthFieldErrors(fields);
      setErrors((prev) => ({
        ...prev,
        general: message,
      }));
      if (field) {
        focusField(field);
      }
    }
  };

  const validateForm = () => {
    const nextErrors = { ...initialErrorState };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      nextErrors.email = "Valid email is required";
    }

    if (!formData.password.trim() || formData.password.trim().length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));
    setAuthFieldErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setAuthFieldErrors(initialAuthFieldState);
    setErrors(validationErrors);

    if (validationErrors.email || validationErrors.password) {
      if (validationErrors.email) {
        focusField("email");
      } else if (validationErrors.password) {
        focusField("password");
      }
      return;
    }

    const submittedData = isSignUp
      ? formData
      : {
          email: formData.email,
          password: formData.password,
        };

    console.log(isSignUp ? "Sign Up Data:" : "Sign In Data:", submittedData);
    await (isSignUp ? signUp() : signIn());
  };

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
    setFormData(initialFormState);
    setErrors(initialErrorState);
    setAuthFieldErrors(initialAuthFieldState);
  };

  const renderInput = (field, label, type = "text") => (
    <div>
      <label
        htmlFor={field}
        className="mb-2 block text-sm font-medium text-[#1C1C1C] dark:text-white"
      >
        {label}
      </label>
      <input
        id={field}
        ref={
          field === "email"
            ? emailRef
            : field === "password"
              ? passwordRef
              : nameRef
        }
        name={field}
        type={type}
        value={formData[field]}
        onChange={handleChange}
        placeholder={
          field === "email"
            ? "Enter your email"
            : field === "password"
              ? "Enter your password"
              : `Enter your ${label.toLowerCase()}`
        }
        className={`w-full rounded-xl border bg-[#F8F8F8] px-4 py-3 text-[#1C1C1C] outline-none transition dark:bg-[#2A2A2A] dark:text-white dark:placeholder:text-gray-500 ${
          errors[field] || authFieldErrors[field]
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            : "border-gray-300 focus:border-[#EF4F5F] focus:ring-2 focus:ring-[#EF4F5F]/20 dark:border-[#3A3A3A]"
        }`}
      />
      {field === "password" && !errors[field] ? (
        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Minimum 6 characters</p>
      ) : null}
      {errors[field] ? <p className="mt-1 text-sm text-red-500">{errors[field]}</p> : null}
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#FFF1F2] via-[#F8F8F8] to-[#FFF8F0] px-4 py-10 dark:from-[#2A1E20] dark:via-[#121212] dark:to-[#241F1B]">
      <div className="w-full max-w-md rounded-[28px] border border-[#E8E8E8] bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md dark:border-[#3A3A3A] dark:bg-[#2A2A2A]">
        <div
          key={isSignUp ? "signup" : "signin"}
          className="transition-all duration-300 ease-out"
        >
          <div className="mb-8 text-center">
            <p className="text-sm font-medium text-[#EF4F5F]">BiteRush</p>
            <h1 className="mt-2 text-3xl font-bold text-[#1C1C1C] dark:text-white">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="mt-2 text-sm text-[#696969] dark:text-gray-400">
              {isSignUp
                ? "Sign up to get started with your account."
                : "Sign in to continue to your account."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && renderInput("name", "Name")}
            {renderInput("email", "Email", "email")}
            {renderInput("password", "Password", "password")}
            {errors.general ? (
              <div className="animate-pulse rounded-md border border-red-200 bg-red-50 px-3 py-2 text-center text-sm text-red-600 dark:border-red-900 dark:bg-red-950/40">
                {errors.general}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={!isFormComplete}
              className="w-full rounded-xl bg-[#EF4F5F] px-4 py-3 font-semibold text-white transition hover:shadow-md hover:brightness-95 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-white"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#696969] dark:text-gray-400">
            {isSignUp ? "Already have an account? " : "New user? "}
            <button
              type="button"
              onClick={toggleMode}
              className="font-semibold text-[#EF4F5F] transition hover:brightness-90"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
