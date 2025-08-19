import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import {AiOutlineClose} from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FormValidation } from '../../utilities/FormValidation';

export default function AddAlert({AddFunction}) {
  let [isOpen, setIsOpen] = useState(false)
  const [state,setState]=useState(null);
  useEffect(()=>{
    setState({
      ...state,
      date:new Date()
    })
  },[]);
  const handleInput=(e)=>{
    setState({
        ...state,
        [e.target.name]:e.target.value
    })
  }
  function closeModal() {
    setState(null);
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  async function add(e)
  {
    if(FormValidation(e))
    {
        await AddFunction(state).then(()=>{
            closeModal();
        }).catch((error)=>{})
    }
  }

  return (
    <>
      <button className='text-white bg-red-500 p-3 rounded-md' onClick={openModal}>Add Alert</button>
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
                    <span>
                    Add Alert
                    </span>
                    <AiOutlineClose size={25} onClick={()=>setIsOpen(false)} />
                  </Dialog.Title>

                  <div className="mt-2">
                    <form noValidate onSubmit={add}>
                    <div className='m-1'>
                        <label htmlFor="title">Title (Required)</label>
                        <input type="text" name='title' id='title' onChange={handleInput} className='w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1' placeholder='Title of the news' required/>
                        <span className="error-message hidden text-red-500">Please enter the title</span>
                    </div>
                    <div className='m-1'>
                        <input id='description' value={state&&state.description} name='description' type="text" className='h-0 w-full opacity-0' required/>
                        <label htmlFor="description">Description(Required)</label>
                        <ReactQuill theme="snow" onChange={(value) => {setState((prevState) => ({ ...prevState, description: value }))}} />
                        <span className="error-message hidden text-red-500">Please enter the description</span>
                    </div>
                    <div className='m-1'>
                        <input id='datetime' value={state&&state.date} name='datetime' type="text" className='h-0 w-full opacity-0' required/>
                        <label htmlFor="datetime">Date And Time</label>
                        <br />
                        <DatePicker yearDropdownItemNumber={100}
                              scrollableYearDropdown
                              showYearDropdown
                              timeIntervals={1}
                              showMonthDropdown selected={state&&state.date} onChange={(value) => {setState((prevState) => ({ ...prevState, date: value}))}}  showTimeSelect className="w-full md:w-96 border-[1px] border-gray-400 p-1 rounded-md outline-none m-1" />
                        <br />
                        <span className="error-message hidden text-red-500">Please select the date & time</span>
                    </div>
                    <div className='m-1'>
                        <label htmlFor="longitude">Longitude</label>
                        <input id='longitude' onChange={handleInput} name='longitude' type="text" className='w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1' placeholder='Longitude' required/>
                        <span className="error-message hidden text-red-500">Please enter the longitude</span>
                    </div>
                    <div className='m-1'>
                        <label htmlFor="latitude">Latitude</label>
                        <input id='latitude' onChange={handleInput}  name='latitude' type="text" className='w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1' placeholder='Latitude' required/>
                        <span className="error-message hidden text-red-500">Please enter the latitude</span>
                    </div>
                    <div className='m-1'>
                        <label htmlFor="location">Loation</label>
                        <input id='location' onChange={handleInput}  name='location' type="text" className='w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1' placeholder='Location' required/>
                        <span className="error-message hidden text-red-500">Please enter the location</span>
                    </div>
                    <div className='m-1'>
                        <label htmlFor="generallocation">General Location</label>
                        <select id='generallocation' onChange={handleInput}  name='generallocation' className='w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1' required>
                        <option value="" disabled selected>Select General Location</option>
                        <option value="Beirut">Beirut</option>
                        <option value="Bekaa">Bekaa</option>
                        <option value="South">South</option>
                        <option value="North">North</option>
                        <option value="MountLebanon">Mount Lebanon</option>
                        </select>
                        <span className="error-message hidden text-red-500">Please select the general location</span>
                    </div>
                    <div className='m-1'>
                        <label htmlFor="statenews">State News</label>
                        <select id='statenews' onChange={handleInput}  name='statenews' className='w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1' required>
                        <option value="" disabled selected>Select State News</option>
                        <option value="Warning">Warning</option>
                        <option value="Shootings">Shootings</option>
                        <option value="RoadBlocks">Road Blocks</option>
                        <option value="Protests">Protests</option>
                        <option value="StateOfAlert">State Of Alert</option>
                        <option value="Grenade">Grenade</option>
                        <option value="StateOfEmergency">State Of Emergency</option>
                        </select>
                        <span className="error-message hidden text-red-500">Please select the risk level</span>
                    </div>
                    <div className='flex justify-end items-center'>
                    <button type='button' onClick={closeModal} className='w-20 border-gray-500 text-gray-500 border-[2px] m-3 rounded-md duration-500 hover:bg-gray-500 hover:text-white'>Cancel</button>
                    <button className='w-20 border-blue-500 text-blue-500 border-[2px] m-3 rounded-md duration-500 hover:bg-blue-500 hover:text-white'>Add Alert</button>
                    </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
