import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
function NavDropDown({ title,active ,children }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
        active&&setOpen(true);
        !active&&setOpen(false);
        // eslint-disable-next-line
  }, [active]);
  return (
    <div>
      <div className="flex justify-between items-center cursor-pointer">
        <div
          onClick={() => {
            setOpen(!open);
          }}
          className="hover:text-blue-400 active:text-blue-400 flex nav-link"
        >
          {title}
        </div>
        <MdKeyboardArrowRight
          id="arrow-icon"
          className={`ml-5 duration-500 ${open ? "rotate-90":"" }`}
          size={30}
        />
      </div>
      <div className={`transform duration-500 mx-6 ${!open?"opacity-0 hidden":""}`} id="menu">
          {children}
      </div>
    </div>
  );
}

export default NavDropDown;
