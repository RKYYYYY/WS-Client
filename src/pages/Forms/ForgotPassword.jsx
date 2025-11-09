import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../api/auth.api";
import Button from "../../components/Common/Button";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);

  const defaultValues = {
    email: "",
  };

  const schema = yup.object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email format"),
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
    const toastId = toast.loading("Sending reset email...");
    try {
      const response = await forgotPassword(values.email);

      if (response.message && !response.message.includes("not found")) {
        toast.success(response.message, { id: toastId });
        setEmailSent(true);
        reset(defaultValues);
      } else {
        toast.error(response.message || "Email not found", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.", { id: toastId });
    }
  }

  if (emailSent) {
    return (
      <div className="w-full flex-col max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-4 sm:p-6 font-schibsted-grotesk text-secondary-100 flex items-center">
        <div className="w-full border border-secondary-700 rounded-2xl py-10 px-7 text-center">
          <div className="bg-green-500/25 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-primary-400 text-2xl sm:text-3xl font-extrabold mb-4">
            Check your email
          </h1>

          <p className="text-secondary-300 text-base sm:text-lg mb-6">
            We've sent you a password reset link. Please check your inbox and
            follow the instructions.
          </p>

          <p className="text-secondary-400 text-sm mb-8">
            Didn't receive the email? Check your spam folder or try again.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              colorVariant="btnPrimaryYellow"
              text="Back to Login"
              onClick={() => navigate("/login")}
            />
            <button
              onClick={() => setEmailSent(false)}
              className="text-secondary-400 hover:text-secondary-300 font-medium transition-colors duration-300"
            >
              Try another email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-col max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-4 sm:p-6 font-schibsted-grotesk text-secondary-100 flex items-center">
      <h1 className="text-primary-400 text-3xl sm:text-5xl font-extrabold mb-10 mt-10">
        Forgot Password
      </h1>

      <p className="text-secondary-300 text-center text-base sm:text-lg mb-10">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>

      <form
        className="flex flex-col gap-2 mb-6 mx-auto w-full min-w-0 sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] border border-secondary-700 rounded-2xl py-3 sm:py-7 px-3 sm:px-7"
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex flex-col mb-2">
          <label htmlFor="email" className="mb-2 text-base lg:text-lg">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Enter your email"
            className="border border-secondary-800 rounded-xl px-3 py-2 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {errors.email && (
            <p className="text-red-400 text-base lg:text-lg mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button
          colorVariant="btnPrimaryYellow"
          text="Send Reset Link"
          type="submit"
        />
      </form>

      <div className="flex flex-col gap-3">
        <p className="text-base lg:text-lg">Remember your password?</p>
        <Button
          colorVariant="btnSecondaryYellow"
          text="Back to Login"
          to="/login"
        />
      </div>
    </div>
  );
}
