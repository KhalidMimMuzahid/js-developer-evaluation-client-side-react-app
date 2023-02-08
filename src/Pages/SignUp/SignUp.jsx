import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import { MyContext } from "../../context/MyProvider/MyProvider";

const SignUp = () => {
  const { createUserWithEmail } = useContext(MyContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [emailPasswordSignUpError, setEmailPasswordSignUpError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const signUpFormSubmit = (data) => {
    setEmailPasswordSignUpError("");
    // console.log(data);
    if (data.password !== data.confirmPassword) {
      setPasswordError("password should be match");
      alert("your provided password are not match");
      return;
    }
    setIsSignUpLoading(true);
    // retrive data from user input form
    const name = data?.name;
    const email = data?.email;
    const password = data?.password;
    console.log(name, email, password);
    createUserWithEmail(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setIsSignUpLoading(false);
        toast.success("user created successfully");
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setIsSignUpLoading(false);
        setEmailPasswordSignUpError(errorMessage);
        // ..
      });
  };
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (value?.password === value?.confirmPassword) {
        setPasswordError("");
      } else {
        setPasswordError("password should be match");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div>
      <div>
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
          <div>
            <h3 className="text-4xl font-bold text-[#FF2108]">Sign Up</h3>
          </div>
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
            <form onSubmit={handleSubmit(signUpFormSubmit)}>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    {...register("email", {
                      required: "Email is required",
                    })}
                    type="email"
                    name="email"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                {errors?.email && (
                  <p role="alert" className="text-red-500 font-bold">
                    {errors?.email?.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Please enter your password",
                      },
                      maxLength: {
                        value: 8,
                        message: "Password can't be more than 8 characters",
                      },
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    type="password"
                    name="password"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                {errors?.password && (
                  <p role="alert" className="text-red-500 font-bold">
                    {/* Name is required */}
                    {errors?.password?.message}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Confirm Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    {...register("confirmPassword", {
                      required: {
                        value: true,
                        message: "Please confirm your password",
                      },
                    })}
                    type="password"
                    name="confirmPassword"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                {errors?.confirmPassword && (
                  <p role="alert" className="text-red-500 font-bold">
                    {errors?.confirmPassword?.message}
                  </p>
                )}
                {passwordError && !errors?.confirmPassword && (
                  <p role="alert" className="text-red-500 font-bold">
                    {passwordError}
                  </p>
                )}
              </div>
              <div className="flex items-center mt-4">
                <button className="w-full px-4 py-2 tracking-wide bg-[#FF2108] text-white transition-colors duration-200 transform gray-900 rounded-md  hover:bg-gray-800 focus:outline-none focus:bg-gray-600">
                  Register
                </button>
              </div>
              {emailPasswordSignUpError && (
                <p role="alert" className="text-red-500 font-bold">
                  {emailPasswordSignUpError}
                </p>
              )}

              {isSignUpLoading && (
                <>
                  <Loader type="progressor" />
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}

                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {" "}
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black">
                    {" "}
                  </div>
                </>
              )}
            </form>

            <div className="mt-4 text-grey-600">
              Already have an account?{" "}
              <span>
                <Link
                  className="text-[#FF2108] hover:underline font-bold"
                  to="/signin"
                >
                  Go to signIn
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
