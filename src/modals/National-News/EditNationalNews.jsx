import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState,useEffect } from 'react'
import { CKEditor } from 'ckeditor4-react';
import {AiOutlineClose} from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import moment from 'moment';
import { FormValidation } from '../../utilities/FormValidation';
export default function EditNationalNews({UpdateFunction,data,id}) {
  let [isOpen, setIsOpen] = useState(false)
  const [state,setState]=useState(null);
  useEffect(()=>{
    setState(data);
    // eslint-disable-next-line
  },[]);
  const handleInput=(e)=>{
    setState({
        ...state,
        [e.target.name]:e.target.value
    })
  }
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  async function update(e)
  {
    if(FormValidation(e))
    {
        await UpdateFunction(state, id).then(()=>{
            closeModal();
        }).catch((error)=>{})
    }
  }

  return (
    <>
      <button className='mx-1 w-16 bg-orange-500 text-white rounded-md p-2' onClick={openModal}>Edit</button>
      {/* <button className='text-white bg-red-500 p-3 rounded-md' onClick={openModal}>Add Alert</button> */}
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
                    Edit Alert
                    </span>
                    <AiOutlineClose size={25} onClick={()=>setIsOpen(false)} />
                  </Dialog.Title>
                  <div className="mt-2">
                    {state&&
                    <form noValidate onSubmit={update}>
                    <div className='m-1'>
                        <label htmlFor="title">Title (Required)</label>
                        <input type="text" name='title' id='title' value={state.title} onChange={handleInput} className='w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1' placeholder='Title of the news' required/>
                        <span className="error-message hidden text-red-500">Please enter the title</span>
                    </div>
                    <div className='m-1'>
                        <input id='description' value={state&&state.description} name='description' type="text" className='h-0 w-full opacity-0' required/>
                        <label htmlFor="description">Description(Required)</label>
                        <ReactQuill value={state.description} theme="snow" onChange={(value) => {setState((prevState) => ({ ...prevState, description: value }))}} />
                        <span className="error-message hidden text-red-500">Please enter the description</span>
                    </div>
                    <div className='m-1'>
                        <label htmlFor="longitude">Longitude</label>
                        <input id='longitude' value={state.longitude} onChange={handleInput} name='longitude' type="text" className='w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1' placeholder='Longitude' required/>
                        <span className="error-message hidden text-red-500">Please enter the longitude</span>
                    </div>
                    <div className='m-1'>
                        <label htmlFor="latitude">Latitude</label>
                        <input id='latitude' value={state.latitude}  onChange={handleInput}  name='latitude' type="text" className='w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1' placeholder='Latitude' required/>
                        <span className="error-message hidden text-red-500">Please enter the latitude</span>
                    </div>
                    <div className='m-1'>
                        <label htmlFor="risklevel">Risk Level</label>
                        <select id='risklevel' value={state.risklevel} onChange={handleInput}  name='risklevel' className='w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1' required>
                        <option value="" disabled selected>Select Risk Level</option>
                        <option value="Hight">Hight</option>
                        <option value="Meduim">Meduim</option>
                        <option value="Low">Low</option>
                        <option value="Normal">Normal</option>
                        </select>
                        <span className="error-message hidden text-red-500">Please select the state of news</span>
                    </div>
                    <div className='flex justify-end items-center'>
                    <button type='button' onClick={closeModal} className='w-20 border-gray-500 text-gray-500 border-[2px] m-3 rounded-md duration-500 hover:bg-gray-500 hover:text-white'>Cancel</button>
                    <button className='w-20 border-blue-500 text-blue-500 border-[2px] m-3 rounded-md duration-500 hover:bg-blue-500 hover:text-white'>Save</button>
                    </div>
                    </form>
                    }
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
