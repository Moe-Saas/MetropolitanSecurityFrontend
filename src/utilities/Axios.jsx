import axios from "axios";
import { Navigate } from "react-router-dom";
import {  toast } from 'react-toastify';
const Axios =axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    headers:{
      "token":localStorage.getItem("token")
    }
  });

  function handleErrorResponse(error){

    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 400:
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        // enqueueSnackbar(error.response.data.message, { variant: "error",anchorOrigin:{ horizontal: "right", vertical: "top" } });
          break;
          case 409:
            toast.error(error.response.data.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          // enqueueSnackbar(error.response.data.message, { variant: "error",anchorOrigin:{ horizontal: "right", vertical: "top" } });
          break;
        case 401:
        // localStorage.removeItem('token');
        <Navigate to="/login" />
          break;
        default:
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        // enqueueSnackbar(error.response.data.message, { variant: "error",anchorOrigin:{ horizontal: "right", vertical: "top" } });
          break;
      }
    } else {
      toast.error("Internal Server Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      // enqueueSnackbar("Internal Server Error", { variant: "error",anchorOrigin:{ horizontal: "right", vertical: "top" } });
    }
    return Promise.reject(error);
  };

  function handleSuccessResponse(response) {
    if (response.status === 201) {
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      // enqueueSnackbar(response.data.message, { variant: "success", anchorOrigin: { horizontal: "right", vertical: "top" } });
    }
    return response;
  }

  Axios.interceptors.response.use(
    (response) => handleSuccessResponse(response),
    (error) => handleErrorResponse(error)
  );

export default Axios;



