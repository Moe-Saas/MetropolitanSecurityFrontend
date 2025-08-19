import Axios from "../../utilities/Axios";
export const LoadUser = () => async (dispatch) => {
  dispatch({
    type: "LoadUserRequest",
  });
  await Axios.get("/get/auth", { withCredentials: true })
    .then((response) => {
      dispatch({
        type: "LoadUserSuccess",
        payload: response.data.user,
      });
    })
    .catch((error) => {
      // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      localStorage.removeItem("token")
      dispatch({
        type: "LoadUserFailed",
        payload: error.response,
      });
    });
};
export const LogoutUser = () => async (dispatch) => {
  dispatch({
    type: "LogoutUser",
    payload: null,
  });
};
