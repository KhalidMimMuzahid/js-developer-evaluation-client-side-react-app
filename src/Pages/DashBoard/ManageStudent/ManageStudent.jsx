import moment from "moment/moment";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader/Loader";
import { MyContext } from "../../../context/MyProvider/MyProvider";
import EachStudent from "./EachStudent/EachStudent";

const ManageStudent = () => {
  const { timeAndDate, currentUser } = useContext(MyContext);
  const [deletingStudentInfo, setDeletingStudentInfo] = useState({});
  const [deletingModalIsOpen, setDeletingModalIsOpen] = useState(false);

  const {
    data: students = [],
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [currentUser],
    queryFn: async () => {
      const res = await fetch(
        `https://js-developer-evaluation.vercel.app/all-students?postCreatorEmail=${currentUser?.email}`
      );
      const data = await res.json();
      // console.log(data);
      return data;
    },
  });
  const handleDeleteStudent = (_id) => {
    console.log(_id);
    fetch(
      `https://js-developer-evaluation.vercel.app/delete-student?_id=${_id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.deletedCount) {
          toast.success(
            `${deletingStudentInfo?.firstName}${
              deletingStudentInfo?.middleName
                ? " " + deletingStudentInfo?.middleName + " "
                : " "
            }${deletingStudentInfo?.lastName} deleted successfully`
          );
          refetch();
        } else {
          toast.error("something went wrong, please try again");
        }
      });
  };
  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <div className="mx-2">
      <div className="flex justify-between py-5">
        <h1 className="text-lg font-bold">Manage Students</h1>
        <h1 className="text-lg ">{timeAndDate}</h1>
      </div>
      {/* list start here  */}
      <div className=" ">
        <div className="grid grid-cols-4 justify-center bg-[#FF2108] py-2  rounded-t-lg">
          <h1 className="text-center">Name</h1>
          <h1 className="text-center">Class</h1>
          <h1 className="text-center">Role No</h1>
          <h1 className="text-center">view/edit/delete</h1>
        </div>
        {students?.length !== 0 && (
          <div className=" border rounded-b-lg ">
            {students?.map((eachStudent, index) => (
              <EachStudent
                refetch={refetch}
                setDeletingStudentInfo={setDeletingStudentInfo}
                setDeletingModalIsOpen={setDeletingModalIsOpen}
                key={eachStudent?._id}
                eachStudent={eachStudent}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* modal for confirm of deleting student info  */}
      {deletingStudentInfo && deletingModalIsOpen && (
        <>
          <input
            type="checkbox"
            id="confirm-deletion-modal"
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Are you want to delete{" "}
                {`${deletingStudentInfo?.firstName}${
                  deletingStudentInfo?.middleName
                    ? " " + deletingStudentInfo?.middleName + " "
                    : " "
                }${deletingStudentInfo?.lastName}`}{" "}
                ?
              </h3>
              <div className="modal-action flex justify-between gap-2">
                <label
                  htmlFor="confirm-deletion-modal"
                  className="btn grow bg-[#FF2108]"
                  onClick={() => handleDeleteStudent(deletingStudentInfo?._id)}
                >
                  Delete
                </label>
                <label
                  htmlFor="confirm-deletion-modal"
                  className="btn grow bg-[#FF2108]"
                >
                  Cancel
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageStudent;
