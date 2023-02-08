import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { MdOutlineGroupAdd } from "react-icons/md";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoIosLogOut } from "react-icons/io";
import { MyContext } from "../../context/MyProvider/MyProvider";
const DashBoard = () => {
  const location = useLocation();
  const { logOut } = useContext(MyContext);
  //   console.log(x);
  // console.log("xxx:", location?.pathname);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div>
      {/* drawer here  */}
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          {" "}
          <ul className="flex flex-col justify-start">
            <li className=" my-1  flex justify-start">
              <Link
                to="/dashboard/add-student"
                className={`flex justify-start btn   hover:bg-[#FF2108] text-slate-900 w-full ${
                  location?.pathname.endsWith("add-student") ||
                  location?.pathname.endsWith("/")
                    ? "bg-[#FF2108]"
                    : "bg-white"
                }`}
              >
                <MdOutlineGroupAdd className="text-lg mr-2" />
                Add Student
              </Link>
            </li>
            <li className="  my-1 flex justify-start ">
              <Link
                to="/dashboard/manages-students"
                className={`flex justify-start btn   hover:bg-[#FF2108] text-slate-900 w-full ${
                  location?.pathname.endsWith("manages-students")
                    ? "bg-[#FF2108]"
                    : "bg-white"
                }`}
              >
                <HiMenuAlt4 className="text-lg mr-2" />
                Manage Students
              </Link>
            </li>
            <li className=" my-1 flex justify-start ">
              <button
                onClick={handleLogOut}
                className="flex justify-start btn bg-white text-slate-900 w-full hover:bg-[#FF2108]"
              >
                <IoIosLogOut className="text-lg mr-2" />
                logOut
              </button>
            </li>
            {/* <li className="btn my-1">Manage Students</li>
            <li className="btn my-1">logOut</li> */}
          </ul>
        </div>
        <div className="col-span-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
