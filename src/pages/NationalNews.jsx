import React, { useState,useEffect } from 'react'
import Axios from '../utilities/Axios'
import ViewAlert from '../modals/Alerts/ViewAlert';
import AddNationalNews from '../modals/National-News/AddNationalNews';
import EditNationalNews from '../modals/National-News/EditNationalNews';
import DeleteNatioanlNews from '../modals/National-News/DeleteNationalNews';
import ViewNatioanlNews from '../modals/National-News/ViewNationalNews';
function NationalNews() {
    const [news,setNews]=useState([]);
    async function getNews()
    {
        await Axios.get('/national-news',{withCredentials:true}).then((response)=>{
            setNews(response.data.news)
        }).catch((error)=>{})
    }
    useEffect(()=>{
        getNews();
    },[]);
    async function addFunction(state)
    {
        await Axios.post('/national-news/create',state,{withCredentials:true}).then((response)=>{
            const newData=[...news,response.data.news];
            setNews(newData);
        }).catch((error)=>{})
    }
    async function updateFunction(state,id)
    {
        await Axios.post(`/national-news/update/${id}`,state,{withCredentials:true}).then((response)=>{
            getNews();
        }).catch((error)=>{})
    }
    async function delteFunction(id)
    {
        await Axios.delete(`/national-news/delete/${id}`,{withCredentials:true}).then((response)=>{
            getNews();
        }).catch((error)=>{})
    }
  return (
    <div>
    <div className=' flex justify-center'>
        <div className='border-[1px] border-black w-full m-3 p-3 text-center rounded-md'>
            <h1 className='font-bold text-xl md:text-3xl'>List Of National News Risk</h1>
        </div>
    </div>
    <div align="center">
    <AddNationalNews AddFunction={addFunction} />
    </div>

    <div class="relative overflow-x-auto m-3">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                    Title
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Longitude
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Latitude
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Risk Level
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    news.map((item)=>{
                        return <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.title}
                        </th>
                        <td class="px-6 py-4">
                            {item.longitude}
                        </td>
                        <td class="px-6 py-4">
                            {item.latitude}
                        </td>
                        <td class="px-6 py-4">
                            {item.risklevel}
                        </td>
                        <td class="px-6 py-4">
                            <div className='flex items-center'>
                                <EditNationalNews UpdateFunction={updateFunction} data={item} id={item._id} />
                                <DeleteNatioanlNews DeleteFunction={delteFunction} id={item._id} />
                                <ViewNatioanlNews data={item} />
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

export default NationalNews
