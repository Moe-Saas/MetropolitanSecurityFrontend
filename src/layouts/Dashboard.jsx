import React, { Fragment, useEffect, useState } from "react";
import {
  NavLink,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { CiSettings } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut, FiAlertCircle, FiUsers } from "react-icons/fi";
import { CgMenuLeft } from "react-icons/cg";
import { AiOutlineClose, AiOutlineUnorderedList,AiOutlineUser } from "react-icons/ai";
import { TfiWorld } from "react-icons/tfi";
import { RiAdminLine } from "react-icons/ri";
import { BsFlag, BsInfoCircle } from "react-icons/bs";
import Store from "../redux/store";
import { LoadUser, LogoutUser } from "../redux/actions/UserActions";
import { useSelector } from "react-redux";
import MobileSidebar from "./MobileSideBar";
import NavDropDown from "../components/NavDropDown";
import { MdOutlineContactPhone, MdSecurity } from "react-icons/md";
function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const user = useSelector((state) => state.user).user;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (document.cookie.split("token=")[1] || localStorage.getItem("token"))
      Store.dispatch(LoadUser()).then(() => {
          user&&user.type!=="admin"&&navigate("/login");
        setLoading(false);
      });
    else setLoading(false);
    // eslint-disable-next-line
  }, []);
  async function logout() {
    Store.dispatch(LogoutUser()).then(() => {
      navigate("/login");
    });
  }
  return (
    <div className="flex">
      {!loading ? (
        user ? (
          <>
            <div className="hidden md:block bg-[#3f4d67] h-[100vh] w-[250px]">
              <div align="center">
                <img
                  src={require("../assets/ms-logo-trp.png")}
                  alt=""
                  className="h-24 w-24 mt-10"
                />
              </div>
              <div className="flex justify-center bottom-0 mb-10 absolute pl-12">
                <img
                  src={require("../assets/de-logo-white.png")}
                  alt=""
                  className="h-14 w-32"
                />
              </div>
              <ul className="nav-links list-none">
                <li className="flex ml-6 text-gray-400 items-center my-6">
                  <NavLink
                    to={"/dashboard/alerts"}
                    className="hover:text-blue-400 active:text-blue-400 flex nav-link"
                    activeClassName={"acitve"}
                  >
                    <FiAlertCircle className="mr-3" size={25} /> Alerts
                  </NavLink>
                </li>
                <li className="flex ml-6 text-gray-400 items-center my-6">
                  <NavLink
                    to={"/dashboard/national-news"}
                    className="hover:text-blue-400 active:text-blue-400 flex nav-link"
                    activeClassName={"acitve"}
                  >
                    <TfiWorld className="mr-3" size={25} /> National News
                  </NavLink>
                </li>
                <li className="flex ml-6 text-gray-400 items-center my-6 justify-between mr-3">
                    <NavDropDown title={<><FiUsers className="mr-3" size={25} /> Users & Admins</>} active={location.pathname==="/dashboard/users"||location.pathname==="/dashboard/admins"?true:false}>
                        <ul>
                    <li className="flex ml-6 text-gray-400 items-center my-6">
                    <NavLink
                    to={"/dashboard/users"}
                    className="hover:text-blue-400 active:text-blue-400 flex nav-link"
                    activeClassName={"acitve"}>
                        <AiOutlineUser className="mr-3"  size={25} />
                        Users
                    </NavLink>
                    </li>
                    <li className="flex ml-6 text-gray-400 items-center">
                    <NavLink
                    to={"/dashboard/admins"}
                    className="hover:text-blue-400 active:text-blue-400 flex nav-link"
                    activeClassName={"acitve"}>
                        <RiAdminLine className="mr-3"  size={25} />
                        Admins
                    </NavLink>
                    </li>
                    </ul>
                    </NavDropDown>
                </li>
                <li className="flex ml-6 text-gray-400 items-center my-6">
                  <NavLink
                    to={"/dashboard/special-announcements"}
                    className="hover:text-blue-400 active:text-blue-400 flex nav-link"
                    activeClassName={"acitve"}
                  >
                    <AiOutlineUnorderedList className="mr-3" size={25} />{" "}
                    Special Annoucements
                  </NavLink>
                </li>
                <li className="flex ml-6 text-gray-400 items-center my-6">
                  <NavLink
                    to={"/dashboard/contact-us"}
                    className="hover:text-blue-400 active:text-blue-400 flex nav-link"
                    activeClassName={"acitve"}
                  >
                    <MdOutlineContactPhone className="mr-3" size={25} />{" "}
                    Contact Us
                  </NavLink>
                </li>
                <li className="flex ml-6 text-gray-400 items-center my-6">
                  <NavLink
                    to={"/dashboard/about-us"}
                    className="hover:text-blue-400 active:text-blue-400 flex nav-link"
                    activeClassName={"acitve"}
                  >
                    <BsInfoCircle className="mr-3" size={25} />{" "}
                    About Us
                  </NavLink>
                </li>
                <li className="flex ml-6 text-gray-400 items-center my-6">
                  <NavLink
                    to={"/dashboard/about-lebanon"}
                    className="hover:text-blue-400 active:text-blue-400 flex nav-link"
                    activeClassName={"acitve"}
                  >
                    <BsFlag className="mr-3" size={25} />{" "}
                    About Lebanon
                  </NavLink>
                </li>
                <li className="flex ml-6 text-gray-400 items-center my-6">
                  <NavLink
                    to={"/dashboard/security-situation"}
                    className="hover:text-blue-400 active:text-blue-400 flex nav-link"
                    activeClassName={"acitve"}
                  >
                    <MdSecurity className="mr-3" size={25} />{" "}
                    Security Situation
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-[calc(100vw-250px)]">
              <div className="bg-[#3f4d67] md:hidden flex justify-between items-center h-20 px-3">
                <img
                  src={require("../assets/de-logo-color.png")}
                  alt=""
                  className="h-14 w-32"
                />
                {openMenu ? (
                  <AiOutlineClose
                    size={25}
                    color="white"
                    onClick={() => setOpenMenu(!openMenu)}
                  />
                ) : (
                  <CgMenuLeft
                    size={25}
                    color="white"
                    onClick={() => setOpenMenu(!openMenu)}
                  />
                )}
                <MobileSidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
              </div>
              <div className="bg-white flex justify-end px-3">
                <Menu
                  as="div"
                  className="relative inline-block text-left md:m-5"
                >
                  <div>
                    <Menu.Button className="hover:text-blue-400">
                      <CiSettings size={25} />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-[#04a9f5] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <div
                          className="flex p-3 text-white justify-between items-center"
                          onClick={logout}
                        >
                          <div className="flex items-center">
                            {user.avatar?
                            <img src={process.env.REACT_APP_MediaURL+user.avatar} alt="" className="h-9 w-9 rounded-full" />
                            :
                            <FaUserCircle
                              size={30}
                              color="white"
                              className="mr-2"
                            />
                            }
                            <span>{user.name}</span>
                          </div>
                          <FiLogOut size={20} />
                        </div>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="overflow-y-scroll h-[90vh]">
              <Outlet />
              </div>
            </div>
          </>
        ) : (
          <Navigate to={"/login"} />
        )
      ) : (
        <></>
      )}
    </div>
  );
}

export default Dashboard;
