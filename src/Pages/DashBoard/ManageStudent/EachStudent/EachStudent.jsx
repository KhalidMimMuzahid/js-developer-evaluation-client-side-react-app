import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import Loader from "../../../../Components/Loader/Loader";
const EachStudent = ({
  eachStudent,
  refetch,
  index,
  setDeletingStudentInfo,
  setDeletingModalIsOpen,
}) => {
  const {
    addressLine1,
    addressLine2,
    city,
    firstName,
    landMark,
    lastName,
    middleName,
    pinCode,
    rollNo,
    selectedClass,
    selectedDivision,
    _id,
  } = eachStudent;
  const [isUpdating, setIsUpdating] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const [actionType, setActionType] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleUpdateStudentFormSubmit = (data) => {
    // console.log("data: ", data);
    // setIsUpdating(true);
    const studentInfo = { ...data };
    console.log("studentInfo: ", studentInfo);
    fetch(
      `https://js-developer-evaluation.vercel.app/update-student?_id=${_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentInfo),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.modifiedCount) {
          toast.success("Student added successfully");
          setIsUpdating(false);
          setIsExpand(false);
          reset();
          refetch();
        } else {
          setIsUpdating(false);
          toast.error("something went wrong, please try again");
        }
      });
  };
  return (
    <>
      {!isExpand ? (
        <div
          className={`grid grid-cols-4  ${
            index % 2 === 1 && "bg-[#FFF6F5]"
          } justify-center py-2 `}
        >
          <h1 className="text-center">{`${firstName}${
            middleName ? " " + middleName + " " : " "
          }${lastName}`}</h1>
          <h1 className="text-center">
            {selectedClass + "-" + selectedDivision}
          </h1>
          <h1 className="text-center">{rollNo}</h1>
          <h1 className="text-center flex justify-center">
            <button
              onClick={() => {
                setActionType("view");
                setIsExpand(true);
              }}
              className="hover:cursor-pointer"
            >
              <AiOutlineEye className=" text-xl" />
            </button>
            <button
              onClick={() => {
                setActionType("edit");
                setIsExpand(true);
              }}
              className="mx-4 hover:cursor-pointer"
            >
              <BiEditAlt className="text-xl" />
            </button>
            <label
              onClick={() => {
                setDeletingStudentInfo(eachStudent);
                setDeletingModalIsOpen(true);
              }}
              htmlFor="confirm-deletion-modal"
              className="hover:cursor-pointer"
            >
              {/* className="btn">open modal */}
              <RiDeleteBin6Line className=" text-xl" />
            </label>
          </h1>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(handleUpdateStudentFormSubmit)}
          className="my-3 border-2 border-black p-2"
        >
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
                  disabled={actionType === "view"}
                  defaultValue={firstName}
                  type="text"
                  name="firstName"
                  className="input-sm w-full bg-[#FFFFFF] border-2 border-x-slate-400"
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
                  disabled={actionType === "view"}
                  defaultValue={middleName}
                  type="text"
                  name="middleName"
                  className="input-sm w-full bg-[#FFFFFF] border-2 border-x-slate-400"
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
                  disabled={actionType === "view"}
                  defaultValue={lastName}
                  type="text"
                  name="lastName"
                  className="input-sm w-full bg-[#FFFFFF] border-2 border-x-slate-400"
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
          <div className="flex justify-between gap-2 mt-2">
            <div className="grow">
              <div className="flex flex-col items-start">
                <select
                  {...register("selectedClass")}
                  disabled={actionType === "view"}
                  className="select select-sm select-bordered w-full"
                >
                  <option selected={selectedClass === "I"} value="I">
                    I
                  </option>
                  <option selected={selectedClass === "II"} value="II">
                    II
                  </option>
                  <option selected={selectedClass === "III"} value="III">
                    III
                  </option>
                  <option selected={selectedClass === "IV"} value="IV">
                    IV
                  </option>
                  <option selected={selectedClass === "V"} value="V">
                    V
                  </option>
                  <option selected={selectedClass === "VI"} value="VI">
                    VI
                  </option>
                  <option selected={selectedClass === "VII"} value="VII">
                    VII
                  </option>
                  <option selected={selectedClass === "VIII"} value="VIII">
                    VIII
                  </option>
                  <option selected={selectedClass === "IX"} value="IX">
                    IX
                  </option>
                  <option selected={selectedClass === "X"} value="X">
                    X
                  </option>
                  <option selected={selectedClass === "XI"} value="XI">
                    XI
                  </option>
                  <option selected={selectedClass === "XII"} value="XII">
                    XII
                  </option>
                </select>
              </div>
            </div>
            <div className="grow">
              <div className="flex flex-col items-start">
                <select
                  {...register("selectedDivision")}
                  disabled={actionType === "view"}
                  className="select select-sm select-bordered w-full"
                >
                  <option selected={selectedDivision === "A"} value="A">
                    A
                  </option>
                  <option selected={selectedDivision === "B"} value="B">
                    B
                  </option>
                  <option selected={selectedDivision === "C"} value="C">
                    C
                  </option>
                  <option selected={selectedDivision === "D"} value="D">
                    D
                  </option>
                  <option selected={selectedDivision === "E"} value="E">
                    E
                  </option>
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
                  disabled={actionType === "view"}
                  defaultValue={rollNo}
                  type="number"
                  name="rollNo"
                  className="input-sm w-full bg-[#FFFFFF] border-2 border-x-slate-400"
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
          <div className="flex justify-between gap-2 mt-4">
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
                  disabled={actionType === "view"}
                  defaultValue={addressLine1}
                  name="addressLine1"
                  className="input-sm w-full bg-[#FFFFFF] border-2 border-x-slate-400"
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
                  disabled={actionType === "view"}
                  defaultValue={addressLine2}
                  name="addressLine2"
                  className="input-sm w-full bg-[#FFFFFF] border-2 border-x-slate-400"
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
          <div className="flex justify-between gap-2 mt-2">
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
                  disabled={actionType === "view"}
                  defaultValue={landMark}
                  type="text"
                  name="landMark"
                  className="input-sm w-full bg-[#FFFFFF] border-2 border-x-slate-400"
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
                  disabled={actionType === "view"}
                  defaultValue={city}
                  type="text"
                  name="city"
                  className="input-sm w-full bg-[#FFFFFF] border-2 border-x-slate-400"
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
                  disabled={actionType === "view"}
                  defaultValue={pinCode}
                  type="number"
                  name="pinCode"
                  className="input-sm w-full bg-[#FFFFFF] border-2 border-x-slate-400"
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
          {actionType === "edit" ? (
            <div className="flex gap-2 justify-between mt-2">
              <button
                disabled={isUpdating}
                type="submit"
                className="btn btn-sm grow bg-[#FF2108] "
              >
                Update
              </button>
              <button
                onClick={() => {
                  setIsExpand(false);
                  reset();
                }}
                disabled={isUpdating}
                type="submit"
                className="btn btn-sm grow bg-[#FF2108]"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className=" mt-2">
              <button
                onClick={() => {
                  setIsExpand(false);
                  reset();
                }}
                disabled={isUpdating}
                type="submit"
                className="btn btn-sm w-full grow bg-[#FF2108]"
              >
                Close
              </button>
            </div>
          )}

          {isUpdating && <Loader type="progressor" />}
        </form>
      )}
    </>
  );
};

export default EachStudent;
