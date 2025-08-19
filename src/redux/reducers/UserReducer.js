import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading:false,
  user:null
};
export const UserReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFailed:(state,action)=>{
    state.loading=false;
    state.error=action.payload
  },
  LogoutUser:(state,action)=>{
    state.loading=false;
    state.user=action.payload;
    localStorage.removeItem("token")

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  },
  clearErrors:(state)=>{
    state.error=null;
  }
});
