/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */

"use client";

import { useLoginUser } from "@/src/hook/auth.hook";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Spinner } from "@nextui-org/spinner";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/context/AuthProvider";

type Inputs = {
  email: string;
  password: string;
};

const page = () => {
  const { mutate: HandleLoginUser, isPending, isSuccess } = useLoginUser();

  const { setisLoading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    HandleLoginUser(data);
    setisLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/");
    }
  }, [isPending, isSuccess]);

  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <section className="w-full flex items-center justify-center h-screen  px-4">
      <div className="w-full max-w-md  border border-slate-200 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className={`w-full ${errors.password && "border-red-500 border"} rounded-md`}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">This field is required</span>
          )}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className={`w-full ${errors.password && "border-red-500 border "} rounded-md`}
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
            {/* Toggle visibility button */}
            <span
              className="absolute right-4 top-[30%] cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </span>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              href="/password/forget"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <Button
            className="w-full"
            type="submit"
            color="primary"
            variant="shadow"
            disabled={isPending}
          >
            {isPending && (
              <Spinner size="sm" color="white" labelColor="foreground" />
            )}{" "}
            Sign In
          </Button>

          {/* Divider */}
          <div className="text-center text-sm text-gray-500 mt-4">OR</div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                href="/registration"
                className="text-blue-500 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default page;
