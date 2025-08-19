import React, { useState } from "react";
import Axios from "../utilities/Axios";
import { FormValidation } from "../utilities/FormValidation";
import Store from "../redux/store";
import { LoadUser } from "../redux/actions/UserActions";
import { useLocation, useNavigate } from "react-router-dom";

function Login() {
  const navigate=useNavigate();
  const location=useLocation();
  const [state, setState] = useState(null);
  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  async function login(e) {
    if (FormValidation(e))
      await Axios.post("/admin/login", state, { withCredentials: true })
        .then((response) => {
          localStorage.setItem("token",response.data.token);
          if(location.state&&location.state.next) window.location.href=location.state.next;
          else window.location.href="/dashboard/alerts";
        })
        .catch((error) => {});
  }
  return (
    <div className="bg-gray-50 h-[100vh] flex justify-center items-center">
      <div>
        <div
          className="bg-white border-gray-300 border-[1px] rounded-md  m-3 px-3  max-w-[390px]"
          align="center"
        >
          <img
            src={require("../assets/ms-logo.png")}
            alt=""
            className="w-40 h-40 m-3"
          />
          <h1 className="text-[#072C78] font-[500] text-2xl sm:text-3xl">
            Metropolitan Security
          </h1>
          <form className="my-5" onSubmit={login} noValidate>
            <div className="flex flex-col justify-center">
              <input
                onChange={handleInput}
                type="email"
                required
                name="email"
                id="email"
                className="bg-gray-100 w-64 sm:w-80 h-[40px] outline-none border-gray-300 border-[1px] rounded-md p-5 focus:bg-gray-50 focus:border-blue-400 text-[15px] my-2"
                placeholder="Email@example.com"
              />
              <span className="error-message hidden text-red-500">
                Please enter your email address
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <input
                onChange={handleInput}
                type="password"
                required
                name="password"
                id="password"
                className="bg-gray-100 w-64 sm:w-80 h-[40px] outline-none border-gray-300 border-[1px] rounded-md p-5 focus:bg-gray-50 focus:border-blue-400 text-[15px] my-2"
                placeholder="Password"
              />
              <span className="error-message hidden text-red-500">
                Please enter your password
              </span>
            </div>
            <button className="bg-[#04a9f5] text-white p-3 rounded-md w-20 mt-5">
              Login
            </button>
          </form>
        </div>
        <div className="text-center mt-3" align="center">
          <span>Your Digital Solution provided by</span>
          <div align="center">
            <img
              src={require("../assets/de-logo-color.png")}
              alt=""
              className="w-40 h-15 m-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
