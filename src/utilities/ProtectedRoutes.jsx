import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Store from '../redux/store';
import { LoadUser } from '../redux/actions/UserActions';
import Loader from "react-js-loader";
function ProtectedRoutes() {
    const location=useLocation();
    const user=useSelector((state)=>state.user).user;
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        Store.dispatch(LoadUser()).then(()=>{
            setLoading(false);
        });
    },[])
  return (
    <Fragment>
        {loading?
        <Loader type="spinner-cub" bgColor={"#000000"}  col or={'#000000'} size={100} />:
            user?
            <Outlet />
            :
        <Navigate to="/login" state={{ next:`${location.pathname}` }} />
        }
    </Fragment>
  );
}

export default ProtectedRoutes;
