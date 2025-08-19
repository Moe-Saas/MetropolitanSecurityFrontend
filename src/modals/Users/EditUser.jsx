import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FormValidation } from "../../utilities/FormValidation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function EditUser({ UpdateFunction, data, id }) {
  let [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(null);
  useEffect(() => {
    setState(data);
  }, [data]);
  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  async function update(e) {
    if (FormValidation(e)) {
      await UpdateFunction(state, id)
        .then(() => {
          closeModal();
        })
        .catch((error) => {});
    }
  }

  return (
    <>
      <button
        className="mx-1 w-16 bg-orange-500 text-white rounded-md p-2"
        onClick={openModal}
      >
        Edit
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between"
                  >
                    <span>Edit User</span>
                    <AiOutlineClose
                      size={25}
                      onClick={() => setIsOpen(false)}
                    />
                  </Dialog.Title>
                  <div className="mt-2">
                    {state && (
                      <form noValidate onSubmit={update}>
                        <div className="m-1">
                          <label htmlFor="name">Username (Required)</label>
                          <input
                            type="text"
                            value={state && state.name}
                            name="name"
                            id="name"
                            onChange={handleInput}
                            className="w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1"
                            placeholder="Username"
                            required
                          />
                          <span className="error-message hidden text-red-500">
                            Please enter the username
                          </span>
                        </div>
                        <div className="m-1">
                          <label htmlFor="email">
                            Email address (Required)
                          </label>
                          <input
                            type="text"
                            value={state && state.email}
                            name="email"
                            id="email"
                            onChange={handleInput}
                            className="w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1"
                            placeholder="Email Address"
                            required
                          />
                          <span className="error-message hidden text-red-500">
                            Please enter the email address
                          </span>
                        </div>
                        <div className="m-1">
                          <label htmlFor="password">Password (Required)</label>
                          <input
                            type="text"
                            name="password"
                            id="password"
                            onChange={handleInput}
                            className="w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1"
                            placeholder="Password"
                          />
                          <span className="error-message hidden text-red-500">
                            Please enter a password mor than 8 characters
                          </span>
                        </div>
                        <div className="m-1">
                          <label htmlFor="phone">Phone Number</label>
                          <input
                            type="text"
                            value={state && state.phone}
                            name="phone"
                            id="phone"
                            onChange={handleInput}
                            className="w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1"
                            placeholder="Phone Number"
                          />
                        </div>
                        <div className="m-1">
                          <label htmlFor="location">Location</label>
                          <input
                            type="text"
                            value={state && state.location}
                            name="location"
                            id="location"
                            onChange={handleInput}
                            className="w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1"
                            placeholder="Location"
                          />
                        </div>
                        <div className="m-1">
                          <label htmlFor="description">Description</label>
                          <ReactQuill
                            theme="snow"
                            value={state && state.description}
                            onChange={(value) => {
                              setState((prevState) => ({
                                ...prevState,
                                description: value,
                              }));
                            }}
                          />
                          <span className="error-message hidden text-red-500">
                            Please enter the description
                          </span>
                        </div>
                        <div className="md:flex justify-between items-center">
                          <div className="m-1">
                            <label htmlFor="datetime">Date Of Birth</label>
                            <br />
                            <DatePicker
                              yearDropdownItemNumber={100}
                              scrollableYearDropdown
                              showYearDropdown
                              showMonthDropdown
                              maxDate={new Date()}
                              selected={state&&state.dob && new Date(state.dob)}
                              onChange={(value) => {
                                setState((prevState) => ({
                                  ...prevState,
                                  dob: value,
                                }));
                              }}
                              className="w-full md:w-96 border-[1px] border-gray-400 p-1 rounded-md outline-none m-1"
                            />
                            <br />
                            <span className="error-message hidden text-red-500">
                              Please select the date & time
                            </span>
                          </div>
                          <div>
                            <label>Image</label>
                            <div className="flex">
                              {state && state.avatar && (
                                <img
                                  alt="avatar"
                                  src={
                                    process.env.REACT_APP_MediaURL +
                                    state.avatar
                                  }
                                  className="h-8 w-8 object-cover rounded-full"
                                />
                              )}
                              <label
                                htmlFor="file-upload"
                                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                              >
                                <span>Upload an image</span>
                                <input
                                  type="file"
                                  name="file-upload"
                                  id="file-upload"
                                  className="sr-only"
                                  accept=".jpg,.jpeg,.png"
                                  onChange={(e) =>
                                    setState({
                                      ...state,
                                      image: e.target.files[0],
                                    })
                                  }
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end items-center">
                          <button
                            type="button"
                            onClick={closeModal}
                            className="w-20 border-gray-500 text-gray-500 border-[2px] m-3 rounded-md duration-500 hover:bg-gray-500 hover:text-white"
                          >
                            Cancel
                          </button>
                          <button className="w-20 border-blue-500 text-blue-500 border-[2px] m-3 rounded-md duration-500 hover:bg-blue-500 hover:text-white">
                            Save
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
