import React, { useState,useEffect } from 'react'
import Axios from '../utilities/Axios'
import moment from 'moment';
import AddAdmin from '../modals/Admins/AddAdmin';
import EditAdmin from '../modals/Admins/EditAdmin';
import DeleteAdmin from '../modals/Admins/DeleteAdmin';
import ViewAdmin from '../modals/Admins/ViewAdmin';
function Admins() {
    const [users,setUsers]=useState([]);
    async function getUsers()
    {
        await Axios.get('/admins',{withCredentials:true}).then((response)=>{
            setUsers(response.data.admins)
        }).catch((error)=>{})
    }
    useEffect(()=>{
        getUsers();
    },[]);
    async function addFunction(state)
    {
        let form=new FormData();
        state.name&&form.append("name",state.name);
        state.email&&form.append("email",state.email);
        state.password&&form.append("password",state.password);
        state.dob&&form.append("dob",state.dob);
        state.level&&form.append("level",state.level);
        state.location&&form.append("location",state.location);
        state.phone&&form.append("phone",state.phone);
        state.description&&form.append("description",state.description);
        state.avatar&&form.append("avatar",state.avatar);
        await Axios.post('/admin/register',form,{withCredentials:true,headers:{"Content-Type":"mutlipart/form-data"}}).then((response)=>{
            getUsers();
        }).catch((error)=>{})
    }
    async function updateFunction(state,id)
    {
        let form=new FormData();
        state.name&&form.append("name",state.name);
        state.email&&form.append("email",state.email);
        state.password&&form.append("password",state.password);
        state.dob&&form.append("dob",state.dob);
        state.location&&form.append("location",state.location);
        state.phone&&form.append("phone",state.phone);
        state.description&&form.append("description",state.description);
        state.image&&form.append("image",state.image);
        await Axios.post(`/admin/update/${id}`,form,{withCredentials:true,headers:{"Content-Type":"multipart/form-data"}}).then((response)=>{
            getUsers();
        }).catch((error)=>{})
    }
    async function delteFunction(id)
    {
        await Axios.delete(`/admin/delete/${id}`,{withCredentials:true}).then((response)=>{
            getUsers();
        }).catch((error)=>{})
    }
  return (
    <div>
    <div className=' flex justify-center'>
        <div className='border-[1px] border-black w-full m-3 p-3 text-center rounded-md'>
            <h1 className='font-bold text-xl md:text-3xl'>List Of Admins</h1>
        </div>
    </div>
    <div align="center">
    <AddAdmin AddFunction={addFunction} />
    </div>

    <div class="relative overflow-x-auto m-3">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                    Username
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Email
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Phone Number
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Location
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Date Of Birth
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((item)=>{
                        return <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 flex items-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.avatar && (
                                <img
                                  alt="avatar"
                                  src={
                                    process.env.REACT_APP_MediaURL +
                                    item.avatar
                                  }
                                  className="mr-3 h-8 w-8 object-cover rounded-full"
                                />
                              )}
                            <span>
                            {item.name}
                            </span>
                        </th>
                        <td class="px-6 py-4">
                            {item.email}
                        </td>
                        <td class="px-6 py-4">
                            {item.phone}
                        </td>
                        <td class="px-6 py-4">
                            {item.location}
                        </td>
                        <td class="px-6 py-4">
                            {item.dob&&moment(item.dob).format("DD/M/YYYY")}
                        </td>
                        <td class="px-6 py-4">
                            <div className='flex items-center'>
                                <EditAdmin UpdateFunction={updateFunction} data={item} id={item._id} />
                                <DeleteAdmin DeleteFunction={delteFunction} id={item._id} />
                                <ViewAdmin data={item} />
                            </div>
                        </td>
                    </tr>
                    })
                }

            </tbody>
        </table>
    </div>

    </div>
  )
}

export default Admins
