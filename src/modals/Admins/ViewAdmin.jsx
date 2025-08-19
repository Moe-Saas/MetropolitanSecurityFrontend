import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState,useEffect } from 'react'
import {AiOutlineClose} from "react-icons/ai";
import {MdDangerous} from "react-icons/md";
import moment from 'moment';
export default function ViewAdmin({data}) {
  let [isOpen, setIsOpen] = useState(false)
  let [state, setState] = useState(null);
  useEffect(()=>{
    setState(data);
}, [data]);
function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  async function remove()
  {
        await DeleteFunction(id).then(()=>{
            closeModal();
        }).catch((error)=>{})
  }

  return (
    <>
    <button className='mx-1 w-16 bg-blue-500 text-white rounded-md p-2' onClick={openModal}>View</button>
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
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between"
                  >
                    <span>
                    Admin Details
                    </span>
                    <AiOutlineClose size={25} onClick={()=>setIsOpen(false)} />
                  </Dialog.Title>
                  {state&&<div className="mt-2 p-3">
                    <label className='font-[600]'>Username:</label>
                    <p>{state.name}</p>
                    <label className='font-[600]'>Email:</label>
                    <p>{state.email}</p>
                    {state.phone&&<><label className='font-[600]'>Phone Number:</label>
                    <p>{state.phone}</p></>}
                    {state.location&&<><label className='font-[600]'>Location:</label>
                    <p>{state.location}</p></>}
                    {state.description&&<><label className='font-[600]'>Description:</label>
                    <p dangerouslySetInnerHTML={{ __html:state.description }} /></>}
                    {state.dob&&<><label className='font-[600]'>Date Of Birth:</label>
                    <p>{moment(state.dob).format("DD/M/YYYY")}</p></>}
                    {state.avatar&&<><label className='font-[600]'>Profile Picture:</label>
                    <img alt='avatar' src={process.env.REACT_APP_MediaURL+state.avatar} className='h-28 w-28 object-fill rounded-full' /></>}
                  </div>}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
