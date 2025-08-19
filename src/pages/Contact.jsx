import React, { useState,useEffect } from "react";
import { FormValidation } from "../utilities/FormValidation";
import Axios from "../utilities/Axios";

function Contact() {
  const [info, setInfo] = useState(null);
  const handleInput = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  async function getContact()
  {
    await Axios.get('contact').then((response)=>{
        setInfo(response.data.contact)
    }).catch((error)=>{})
  }
  useEffect(()=>{
    getContact()
  },[])
  async function update(e)
  {
    if(FormValidation(e))
    {
        await Axios.post('contact/update',info,{withCredentials:true}).then((response)=>{

        }).catch((error)=>{});
    }
  }
  return (
    <div>
      <div className=" flex justify-center">
        <div className="border-[1px] border-black w-full m-3 p-3 text-center rounded-md">
          <h1 className="font-bold text-xl md:text-3xl">Contact Info</h1>
        </div>
      </div>
      <form noValidate className="w-11/12" onSubmit={update}>
        <div className="m-1">
          <label htmlFor="title">Phone Number</label>
          <input
            type="text"
            name="phone"
            id="phone"
            onChange={handleInput}
            className="w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1"
            placeholder="Phone Number"
            value={info&&info.phone}
            required
          />
          <span className="error-message hidden text-red-500">
            Please enter the phone number
          </span>
        </div>
        <div className="m-1">
          <label htmlFor="title">Email address</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleInput}
            className="w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1"
            placeholder="Email address"
            value={info&&info.email}
            required
          />
          <span className="error-message hidden text-red-500">
            Please enter the email address
          </span>
        </div>
        <div className="m-1">
          <label htmlFor="title">Website</label>
          <input
            type="text"
            name="website"
            id="website"
            onChange={handleInput}
            className="w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1"
            placeholder="Website"
            value={info&&info.website}
            required
          />
          <span className="error-message hidden text-red-500">
            Please enter your website
          </span>
        </div>
        <div className="m-1">
          <label htmlFor="title">Location</label>
          <div className="sm:flex gap-5">
            <div>
              <input
                type="text"
                name="latitude"
                id="latitude"
                onChange={handleInput}
                className="w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1"
                placeholder="Latitude"
                value={info&&info.latitude}
                required
              />
              <span className="error-message hidden text-red-500">
                Please enter the latitude
              </span>
            </div>
            <div>
              <input
                type="text"
                name="longitude"
                id="longitude"
                onChange={handleInput}
                className="w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1"
                placeholder="Longitude"
                value={info&&info.longitude}
                required
              />
              <span className="error-message hidden text-red-500">
                Please enter the longitude
              </span>
            </div>
          </div>
        </div>
        <div className="m-1">
          <div className="sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div>
          <label htmlFor="facebook">Facebook</label>
              <input
                type="text"
                name="facebook"
                id="facebook"
                onChange={handleInput}
                className="w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1"
                placeholder="Facebook"
                value={info&&info.facebook}
                required
              />
              <span className="error-message hidden text-red-500">
                Please enter the facebook
              </span>
            </div>
            <div>
          <label htmlFor="instagram">Instagram</label>
              <input
                type="text"
                name="instagram"
                id="instagram"
                onChange={handleInput}
                className="w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1"
                placeholder="Instagram"
                value={info&&info.instagram}
                required
              />
              <span className="error-message hidden text-red-500">
                Please enter the instagram
              </span>
            </div>
            <div>
          <label htmlFor="instagram">Linkedin</label>
              <input
                type="text"
                name="linkedin"
                id="linkedin"
                onChange={handleInput}
                className="w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1"
                placeholder="Linkedin"
                value={info&&info.linkedin}
                required
              />
              <span className="error-message hidden text-red-500">
                Please enter the linkedin
              </span>
            </div>
            <div>
          <label htmlFor="instagram">Twitter</label>
              <input
                type="text"
                name="twitter"
                id="twitter"
                onChange={handleInput}
                className="w-full border-[1px] border-gray-400 p-1 rounded-md outline-none m-1"
                placeholder="Twitter"
                value={info&&info.twitter}
                required
              />
              <span className="error-message hidden text-red-500">
                Please enter the twitter
              </span>
            </div>
          </div>
        </div>
        <div align="center"><button class="mt-3 text-white bg-red-500 p-3 rounded-md" type="submit">Update Info</button></div>
      </form>
    </div>
  );
}

export default Contact;
