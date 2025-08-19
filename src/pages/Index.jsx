import React, { useState,useEffect } from 'react'
import AddAlert from '../modals/Alerts/AddAlert'
import Axios from '../utilities/Axios'
import EditAlert from '../modals/Alerts/EditModal';
import DeleteAlert from '../modals/Alerts/DeleteAlert';
import ViewAlert from '../modals/Alerts/ViewAlert';
import moment from "moment";
function Index() {
    const [news,setNews]=useState([]);
    const [selectedNews, setSelectedNews] = useState([]);

    // Handle select all checkbox
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedNews(news.map(item => item._id));
        } else {
            setSelectedNews([]);
        }
    };

    // Handle individual checkbox selection
    const handleSelect = (id) => {
        setSelectedNews(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    // Handle multiple delete
    const handleMultipleDelete = async () => {
        if (selectedNews.length > 0) {
            await delteFunction(selectedNews);
            setSelectedNews([]);
        }
    };

    async function getNews()
    {
        await Axios.get('/news').then((response)=>{
            setNews(response.data.news)
        }).catch((error)=>{})
    }
    useEffect(()=>{
        getNews();
    },[]);
    async function addFunction(state)
    {
        await Axios.post('/news/create',state,{withCredentials:true}).then((response)=>{
            const newData=[response.data.news,...news,
            ];
            setNews(newData);
        }).catch((error)=>{})
    }
    async function updateFunction(state,id)
    {
        await Axios.post(`/news/update/${id}`,state,{withCredentials:true}).then((response)=>{
            getNews();
        }).catch((error)=>{})
    }
    async function delteFunction(ids)
    {
        await Axios.post(`/news/delete`,{ids},{withCredentials:true}).then((response)=>{
            getNews();
        }).catch((error)=>{})
    }
  return (
    <div>
    <div className=' flex justify-center'>
        <div className='border-[1px] border-black w-full m-3 p-3 text-center rounded-md'>
            <h1 className='font-bold text-xl md:text-3xl'>List Of Alerts</h1>
        </div>
    </div>
    <div align="center" className="flex justify-center items-center gap-4">
        <AddAlert AddFunction={addFunction} />
        {selectedNews.length > 0 && (
            <button
                onClick={handleMultipleDelete}
                className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition-colors"
            >
                Delete Selected ({selectedNews.length})
            </button>
        )}
    </div>

    <div className="relative overflow-x-auto m-3">
        <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        <input
                            type="checkbox"
                            onChange={handleSelectAll}
                            checked={selectedNews.length === news.length && news.length > 0}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Longitude
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Latitude
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Location
                    </th>
                    <th scope="col" className="px-6 py-3">
                    General Location
                    </th>
                    <th scope="col" className="px-6 py-3">
                    State News
                    </th>
                    <th scope="col" className="px-6 py-3">
                    Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    news.map((item)=>{
                        return <tr key={item._id} className="bg-white border-b">
                        <td className="px-6 py-4">
                            <input
                                type="checkbox"
                                checked={selectedNews.includes(item._id)}
                                onChange={() => handleSelect(item._id)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                        </td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-20 overflow-ellipsis">
                            {item.title}
                        </th>
                        <td className="px-6 py-4">
                            {moment(item.date).format("DD/M/YYYY [at] h:mm A")}
                        </td>
                        <td className="px-6 py-4">
                            {item.longitude}
                        </td>
                        <td className="px-6 py-4">
                            {item.latitude}
                        </td>
                        <td className="px-6 py-4">
                            {item.location}
                        </td>
                        <td className="px-6 py-4">
                            {item.generallocation}
                        </td>
                        <td className="px-6 py-4">
                            {item.statenews}
                        </td>
                        <td className="px-6 py-4">
                            <div className='flex items-center'>
                                <EditAlert UpdateFunction={updateFunction} data={item} id={item._id} />
                                <DeleteAlert DeleteFunction={delteFunction} id={item._id} />
                                <ViewAlert data={item} />
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

export default Index
