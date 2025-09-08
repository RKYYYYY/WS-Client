import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signUp } from "../../api/auth.api";
import { useEffect } from "react";

import Button from "../../components/Common/Button";

export default function Register() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const message = params.get("message");
  console.log(message);

  useEffect(() => {
    if (message === "error") {
      toast.error("Confirmation delay expired");
      navigate("/register", { replace: true }); // suppr le "error" de l'url
    }
  });

  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    rgpd: false,
  };

  const schema = yup.object({
    username: yup.string().required("Username is required."),
    email: yup
      .string()
      .email()
      .required("Le champ est obligatoire")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid format."),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Your password must have minimum 8 characters, 1 uppercase and 1 lowercase letter, 1 number and 1 special character."
      ),
    confirmPassword: yup
      .string()
      .required("Password validation is required.")
      .oneOf([yup.ref("password"), ""], "Passwords aren't matching."),
    rgpd: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  async function submit(values) {
    try {
      const responseFromBackend = await signUp(values);
      if (responseFromBackend.message !== "Already registered") {
        toast.success(responseFromBackend.message);
        navigate("/login");
        reset(defaultValues);
      } else {
        toast.error(responseFromBackend.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full flex-col max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-4 sm:p-6 font-schibsted-grotesk text-secondary-100 flex items-center">
      <h1 className="text-primary-400 text-3xl sm:text-5xl font-extrabold mb-10 mt-10">
        Create an account
      </h1>
      <form
        className="flex flex-col gap-2 mb-6 mx-auto w-full min-w-0 sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] border border-secondary-700 rounded-[16px] py-3 sm:py-7 px-3 sm:px-7"
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex flex-col mb-2">
          <label htmlFor="username" className="mb-2 text-base lg:text-lg">
            Username <span className="text-red-400">*</span>
          </label>
          <input
            {...register("username")}
            type="text"
            id="username"
            placeholder="Enter your username"
            className="border border-secondary-800 rounded-[12px] px-3 py-2 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {errors.username && (
            <p className="text-red-400 text-base lg:text-lg mt-1">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="email" className="mb-2 text-base lg:text-lg">
            E-mail <span className="text-red-400">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Enter your e-mail"
            className="border border-secondary-800 rounded-[12px] px-3 py-2 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {errors.email && (
            <p className="text-red-400 text-base lg:text-lg mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="password" className="mb-2 text-base lg:text-lg">
            Password <span className="text-red-400">*</span>
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter your password"
            className="border border-secondary-800 rounded-[12px] px-3 py-2 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {errors.password && (
            <p className="text-red-400 text-base lg:text-lg mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <label
            htmlFor="confirmPassword"
            className="mb-2 text-base lg:text-lg"
          >
            Confirm password <span className="text-red-400">*</span>
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            className="border border-secondary-800 rounded-[12px] px-3 py-2 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-base lg:text-lg mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <label
            htmlFor="rgpd"
            className="mb-2 text-base lg:text-lg flex items-start"
          >
            <input
              {...register("rgpd")}
              type="checkbox"
              className="mr-2 sm:mr-3 accent-primary-400 mt-1.5"
              id="rgpd"
            />
            <span>
              By submitting this form, I accept the privacy policy and the terms
              of services.
            </span>
          </label>
          {errors.rgpd && (
            <p className="text-red-400 text-base lg:text-lg mt-1">
              {errors.rgpd.message}
            </p>
          )}
        </div>
        <Button colorVariant="btnPrimary" text="Sign up" type="submit" />
      </form>
      <div className="flex flex-col gap-3">
        <p className="text-base lg:text-lg">I already have an account</p>
        <Button colorVariant="btnSecondary" text="Login" to="/login" />
      </div>
    </div>
  );
}
