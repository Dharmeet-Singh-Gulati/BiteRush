import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const initialFormState = {
  name: "",
  email: "",
  password: "",
};

const Login = () => {
  const user = useSelector((state) => state.user.user);

  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const requiredFields = isSignUp
    ? ["name", "email", "password"]
    : ["email", "password"];

  const isFormComplete = requiredFields.every(
    (field) => formData[field].trim() !== "",
  );
  if (user) {
    return <Navigate to={"/"} />;
  }

  const signUp = () => {
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User after Sigin", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("User Failed Sigin ", errorCode, errorMessage);
      });
  };

  const validateForm = () => {
    const nextErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        nextErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

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
      [name]: value.trim() ? "" : prev[name],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const submittedData = isSignUp
      ? formData
      : {
          email: formData.email,
          password: formData.password,
        };

    console.log(isSignUp ? "Sign Up Data:" : "Sign In Data:", submittedData);
    isSignUp ? signUp() : signIn();
  };

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
    setFormData(initialFormState);
    setErrors({});
  };

  const renderInput = (field, label, type = "text") => (
    <div>
      <label
        htmlFor={field}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <input
        id={field}
        name={field}
        type={type}
        value={formData[field]}
        onChange={handleChange}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
      {errors[field] ? (
        <p className="mt-2 text-sm text-red-500">{errors[field]}</p>
      ) : null}
    </div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-100 via-white to-blue-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl transition-all duration-300">
        <div
          key={isSignUp ? "signup" : "signin"}
          className="transition-all duration-300 ease-out"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {isSignUp
                ? "Sign up to get started with your account."
                : "Sign in to continue to your account."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && renderInput("name", "Name")}
            {renderInput("email", "Email", "email")}
            {renderInput("password", "Password", "password")}

            <button
              type="submit"
              disabled={!isFormComplete}
              className="w-full rounded-lg bg-blue-500 px-4 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            {isSignUp ? "Already have an account? " : "New user? "}
            <button
              type="button"
              onClick={toggleMode}
              className="font-semibold text-blue-500 transition hover:text-blue-600"
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
