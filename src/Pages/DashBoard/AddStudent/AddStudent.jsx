import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader/Loader";
import { MyContext } from "../../../context/MyProvider/MyProvider";

const AddStudent = () => {
  const { currentUser, timeAndDate } = useContext(MyContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const handleStudentFormSubmit = (data) => {
    // console.log("data: ", data);
    setIsSubmitting(true);
    const studentInfo = {
      ...data,
      postCreatorEmail: currentUser?.email,
      date: moment().format(),
    };
    // studentInfo.postCreatorEmail = currentUser?.email;
    fetch("http://localhost:5000/add-student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.acknowledged) {
          toast.success("Student added successfully");
          setIsSubmitting(false);
          reset();
        } else {
          setIsSubmitting(false);
          toast.error("something went wrong, please try again");
        }
      });
  };
  return (
    <div className="mx-2">
      <div className="flex justify-between py-5">
        <h1 className="text-lg font-bold">Manage Students</h1>
        <h1 className="text-lg ">{timeAndDate}</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(handleStudentFormSubmit)}>
          {/* 1st section  */}
          <div className="flex justify-between gap-2">
            <div className="grow ">
              <div className="flex flex-col items-start">
                <input
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "first Name is required",
                    },
                    maxLength: {
                      value: 20,
                      message: "Max length cann't be more than 20 character",
                    },
                  })}
                  type="text"
                  name="firstName"
                  className="input-md w-full bg-[#FFFFFF] border-2 border-x-slate-400"
                  placeholder="First name"
                />
              </div>
              {errors?.firstName && (
                <p role="alert" className="text-red-500 font-bold">
                  {/* Name is required */}
                  {errors?.firstName?.message}
                </p>
              )}
            </div>
            <div className="grow ">
              <div className="flex flex-col items-start">
                <input
                  {...register("middleName", {
                    maxLength: {
                      value: 20,
                      message: "Max length can't be more than 20 character",
                    },
                  })}
                  type="text"
                  name="middleName"
                  className="input-md w-full bg-[#FFFFFF] border-2 border-x-slate-400"
                  placeholder="Middle name"
                />
              </div>
              {errors?.middleName && (
                <p role="alert" className="text-red-500 font-bold">
                  {/* Name is required */}
                  {errors?.middleName?.message}
                </p>
              )}
            </div>
            <div className="grow ">
              <div className="flex flex-col items-start">
                <input
                  {...register("lastName", {
                    maxLength: {
                      value: 20,
                      message: "Max length cnn't be more than 20 character",
                    },
                  })}
                  type="text"
                  name="lastName"
                  className="input-md w-full bg-[#FFFFFF] border-2 border-x-slate-400"
                  placeholder="Last name"
                />
              </div>
              {errors?.lastName && (
                <p role="alert" className="text-red-500 font-bold">
                  {errors?.lastName?.message}
                </p>
              )}
            </div>
          </div>

          {/* second section  */}
          <div className="flex justify-between gap-2 mt-6">
            <div className="grow">
              <div className="flex flex-col items-start">
                <select
                  {...register("selectedClass")}
                  className="select select-bordered w-full"
                >
                  <option value="I" disabled selected>
                    Select Class
                  </option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                  <option value="V">V</option>
                  <option value="VI">VI</option>
                  <option value="VII">VII</option>
                  <option value="VIII">VIII</option>
                  <option value="IX">IX</option>
                  <option value="X">X</option>
                  <option value="XI">XI</option>
                  <option value="XII">XII</option>
                </select>
              </div>
            </div>
            <div className="grow">
              <div className="flex flex-col items-start">
                <select
                  {...register("selectedDivision")}
                  className="select select-bordered w-full"
                >
                  <option value="A" disabled selected>
                    Select Division
                  </option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
              </div>
            </div>
            <div className="grow">
              <div className="flex flex-col items-start">
                <input
                  {...register("rollNo", {
                    required: {
                      value: true,
                      message: "Roll No is required",
                    },
                    maxLength: {
                      value: 2,
                      message: "Max length can't be more than 2 character",
                    },
                  })}
                  type="number"
                  name="rollNo"
                  className="input-md w-full bg-[#FFFFFF] border-2 border-x-slate-400"
                  placeholder="Enter Roll Number in Digits"
                />
              </div>
              {errors?.rollNo && (
                <p role="alert" className="text-red-500 font-bold">
                  {/* Name is required */}
                  {errors?.rollNo?.message}
                </p>
              )}
            </div>
          </div>
          {/* third section  */}
          <div className="flex justify-between gap-2 mt-10">
            <div className="grow ">
              <div className="flex flex-col items-start">
                <textarea
                  {...register("addressLine1", {
                    required: {
                      value: true,
                      message: "Address Line 1",
                    },
                    maxLength: {
                      value: 50,
                      message: "Max length cann't be more than 50 character",
                    },
                  })}
                  name="addressLine1"
                  className="input-md w-full bg-[#FFFFFF] border-2 border-x-slate-400"
                  placeholder="Address Line 1"
                />
              </div>
              {errors?.addressLine1 && (
                <p role="alert" className="text-red-500 font-bold">
                  {errors?.addressLine1?.message}
                </p>
              )}
            </div>
            <div className="grow ">
              <div className="flex flex-col items-start">
                <textarea
                  {...register("addressLine2", {
                    required: {
                      value: true,
                      message: "Address Line 2",
                    },
                    maxLength: {
                      value: 50,
                      message: "Max length can't be more than 50 character",
                    },
                  })}
                  name="addressLine2"
                  className="input-md w-full bg-[#FFFFFF] border-2 border-x-slate-400"
                  placeholder="Address Line 2"
                />
              </div>
              {errors?.addressLine2 && (
                <p role="alert" className="text-red-500 font-bold">
                  {errors?.addressLine2?.message}
                </p>
              )}
            </div>
          </div>
          {/* 4rth section  */}
          <div className="flex justify-between gap-2 mt-6">
            <div className="grow ">
              <div className="flex flex-col items-start">
                <input
                  {...register("landMark", {
                    required: {
                      value: true,
                      message: "landMark is required",
                    },
                    maxLength: {
                      value: 20,
                      message: "Max length cann't be more than 20 character",
                    },
                  })}
                  type="text"
                  name="landMark"
                  className="input-md w-full bg-[#FFFFFF] border-2 border-x-slate-400"
                  placeholder="Land Mark"
                />
              </div>
              {errors?.landMark && (
                <p role="alert" className="text-red-500 font-bold">
                  {/* Name is required */}
                  {errors?.landMark?.message}
                </p>
              )}
            </div>
            <div className="grow ">
              <div className="flex flex-col items-start">
                <input
                  {...register("city", {
                    required: {
                      value: true,
                      message: "city is required",
                    },
                    maxLength: {
                      value: 20,
                      message: "Max length can't be more than 20 character",
                    },
                  })}
                  type="text"
                  name="city"
                  className="input-md w-full bg-[#FFFFFF] border-2 border-x-slate-400"
                  placeholder="City"
                />
              </div>
              {errors?.city && (
                <p role="alert" className="text-red-500 font-bold">
                  {/* Name is required */}
                  {errors?.city?.message}
                </p>
              )}
            </div>
            <div className="grow ">
              <div className="flex flex-col items-start">
                <input
                  {...register("pinCode", {
                    required: {
                      value: true,
                      message: "pin code is required",
                    },
                    maxLength: {
                      value: 6,
                      message: "pin code length must be 6 character",
                    },
                    minLength: {
                      value: 6,
                      message: "pin code length must be 6 character",
                    },
                  })}
                  type="number"
                  name="pinCode"
                  className="input-md w-full bg-[#FFFFFF] border-2 border-x-slate-400"
                  placeholder="Pin Code"
                />
              </div>
              {errors?.pinCode && (
                <p role="alert" className="text-red-500 font-bold">
                  {errors?.pinCode?.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 mt-6">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn bg-[#FF2108] w-full "
            >
              submit
            </button>
          </div>
        </form>
        {isSubmitting && <Loader type="progressor" />}
      </div>
    </div>
  );
};

export default AddStudent;
