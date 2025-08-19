import React, { Fragment, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { Dialog, Transition } from "@headlessui/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiAlertCircle, FiUsers } from "react-icons/fi";
import { TfiWorld } from "react-icons/tfi";
import { AiOutlineUnorderedList, AiOutlineUser } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";
import { MdKeyboardArrowDown, MdKeyboardArrowRight, MdOutlineContactPhone, MdSecurity } from "react-icons/md";
import NavDropDown from "../components/NavDropDown";
import { BsFlag, BsInfoCircle } from "react-icons/bs";
function MobileSidebar({ openMenu, setOpenMenu }) {
  const location = useLocation();
  useEffect(() => {
    setOpenMenu(false);
    // eslint-disable-next-line
  }, [location.pathname]);
  return (
    <Transition.Root show={openMenu} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setOpenMenu(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-in-out duration-500"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-500"
          leaveFrom="translate-x-full"
          leaveTo="-translate-x-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-20 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="absolute inset-0">
            <div className="pointer-events-none fixed inset-y-0 flex max-w-full sm:w-[50%] lg:w-[25%]">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto max-w-md">
                  <div className="flex h-full flex-col bg-[#3f4d67] shadow-xl">
                    <div className="flex-1 px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <div className="flex justify-end h-7 w-full">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500 outline-none"
                            onClick={() => setOpenMenu(false)}
                          >
                            <RxCross1 className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="w-[70vw] py-6">
                        <ul className="nav-links list-none">
                          <li className="flex ml-3 text-gray-400 items-center my-6">
                            <NavLink
                              to={"/dashboard/alerts"}
                              className="hover:text-blue-400 active:text-blue-400 flex nav-link"
                              activeClassName={"acitve"}
                            >
                              <FiAlertCircle className="mr-3" size={25} />{" "}
                              Alerts
                            </NavLink>
                          </li>
                          <li className="flex ml-3 text-gray-400 items-center my-6">
                            <NavLink
                              to={"/dashboard/national-news"}
                              className="hover:text-blue-400 active:text-blue-400 flex nav-link"
                              activeClassName={"acitve"}
                            >
                              <TfiWorld className="mr-3" size={25} /> National
                              News
                            </NavLink>
                          </li>
                          <li className="flex ml-3 text-gray-400 items-center my-6 justify-between mr-2">
                            <NavDropDown
                              title={
                                <>
                                  <FiUsers className="mr-3" size={25} /> Users &
                                  Admins
                                </>
                              }
                              active={location.pathname==="/dashboard/users"||location.pathname==="/dashboard/admins"?true:false}
                            >
                              <ul>
                                <li className="flex ml-6 text-gray-400 items-center my-6">
                                  <NavLink
                                    to={"/dashboard/users"}
                                    className="hover:text-blue-400 active:text-blue-400 flex nav-link"
                                    activeClassName={"acitve"}
                                  >
                                    <AiOutlineUser className="mr-3" size={25} />
                                    Users
                                  </NavLink>
                                </li>
                                <li className="flex ml-6 text-gray-400 items-center">
                                  <NavLink
                                    to={"/dashboard/admins"}
                                    className="hover:text-blue-400 active:text-blue-400 flex nav-link"
                                    activeClassName={"acitve"}
                                  >
                                    <RiAdminLine className="mr-3" size={25} />
                                    Admins
                                  </NavLink>
                                </li>
                              </ul>
                            </NavDropDown>
                          </li>
                          <li className="flex ml-3 text-gray-400 items-center my-6">
                            <NavLink
                              to={"/dashboard/special-announcements"}
                              className="hover:text-blue-400 active:text-blue-400 flex nav-link"
                              activeClassName={"acitve"}
                            >
                              <AiOutlineUnorderedList
                                className="mr-3"
                                size={25}
                              />{" "}
                              Special Annoucements
                            </NavLink>
                          </li>
                          <li className="flex ml-3 text-gray-400 items-center my-6">
                  <NavLink
                    to={"/dashboard/contact-us"}
                    className="hover:text-blue-400 active:text-blue-400 flex nav-link"
                    activeClassName={"acitve"}
                  >
                    <MdOutlineContactPhone className="mr-3" size={25} />{" "}
                    Contact Us
                  </NavLink>
                </li>
                <li className="flex ml-3 text-gray-400 items-center my-6">
                  <NavLink
                    to={"/dashboard/about-us"}
                    className="hover:text-blue-400 active:text-blue-400 flex nav-link"
                    activeClassName={"acitve"}
                  >
                    <BsInfoCircle className="mr-3" size={25} />{" "}
                    About Us
                  </NavLink>
                </li>
                <li className="flex ml-3 text-gray-400 items-center my-6">
                  <NavLink
                    to={"/dashboard/about-lebanon"}
                    className="hover:text-blue-400 active:text-blue-400 flex nav-link"
                    activeClassName={"acitve"}
                  >
                    <BsFlag className="mr-3" size={25} />{" "}
                    About Lebanon
                  </NavLink>
                </li>
                <li className="flex ml-3 text-gray-400 items-center my-6">
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
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default MobileSidebar;
