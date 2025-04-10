import React from "react";
const NavItem = ({ icon, text, isOpen, setIsOpen }) => {
  return (
    <div className="flex items-center gap-4 cursor-pointer w-full hover:text-blue-500">
      <span
        onClick={() => setIsOpen((prev) => !prev)}
        data-tooltip-id={!isOpen ? "sidebar-tooltip" : undefined}
        data-tooltip-content={!isOpen ? text : undefined}
        className="text-3xl"
      >
        {icon}
      </span>
      {isOpen && <div>{text}</div>}
    </div>
  );
};

export default NavItem;
