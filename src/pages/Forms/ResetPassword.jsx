import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../api/auth.api";
import Button from "../../components/Common/Button";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const defaultValues = {
    password: "",
    confirmPassword: "",
  };

  const schema = yup.object({
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Your password must have minimum 8 characters, 1 uppercase and 1 lowercase letter, 1 number and 1 special character."
      ),
    confirmPassword: yup
      .string()
      .required("Password confirmation is required")
      .oneOf([yup.ref("password"), ""], "Passwords don't match"),
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
    const toastId = toast.loading("Resetting password...");
    try {
      const response = await resetPassword(token, values.password);

      if (response.message === "Password reset successfully") {
        toast.success("Password reset successfully!", { id: toastId });
        reset(defaultValues);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(response.message || "Failed to reset password", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.", { id: toastId });
    }
  }

  return (
    <div className="w-full flex-col max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-4 sm:p-6 font-schibsted-grotesk text-secondary-100 flex items-center">
      <h1 className="text-primary-400 text-3xl sm:text-5xl font-extrabold mb-10 mt-10">
        Reset Password
      </h1>

      <p className="text-secondary-300 text-center text-base sm:text-lg mb-10">
        Enter your new password below.
      </p>

      <form
        className="flex flex-col gap-2 mb-6 mx-auto w-full min-w-0 sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] border border-secondary-700 rounded-2xl py-3 sm:py-7 px-3 sm:px-7"
        onSubmit={handleSubmit(submit)}
      >
        <div className="flex flex-col mb-2">
          <label htmlFor="password" className="mb-2 text-base lg:text-lg">
            New Password <span className="text-red-400">*</span>
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter your new password"
            className="border border-secondary-800 rounded-xl px-3 py-2 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
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
            Confirm New Password <span className="text-red-400">*</span>
          </label>
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            placeholder="Confirm your new password"
            className="border border-secondary-800 rounded-xl px-3 py-2 text-base lg:text-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-base lg:text-lg mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          colorVariant="btnPrimaryYellow"
          text="Reset Password"
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
