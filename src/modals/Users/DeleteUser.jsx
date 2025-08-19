import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {AiOutlineClose} from "react-icons/ai";
import {MdDangerous} from "react-icons/md";
export default function DeleteUser({DeleteFunction,id}) {
  let [isOpen, setIsOpen] = useState(false)
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
    <button className='mx-1 w-16 bg-red-500 text-white rounded-md p-2' onClick={openModal}>Delete</button>
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
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 flex justify-between"
                  >
                    <span>
                    Delete User
                    </span>
                    <AiOutlineClose size={25} onClick={()=>setIsOpen(false)} />
                  </Dialog.Title>
                  <div className="mt-2 flex justify-center items-center flex-col text-center">
                    <MdDangerous size={80} color='red' />
                    <span>Are you sure you need to delete this user?</span>
                    <div className='flex justify-center items-center'>
                    <button type='button' onClick={closeModal} className='w-20 border-gray-500 text-gray-500 border-[2px] m-3 rounded-md duration-500 hover:bg-gray-500 hover:text-white'>Cancel</button>
                    <button type='button' onClick={remove} className='w-20 border-red-500 text-red-500 border-[2px] m-3 rounded-md duration-500 hover:bg-red-500 hover:text-white'>Yes</button>
                    </div>
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
