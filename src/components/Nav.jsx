import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons"; // ✅ Correct import
import { faPlus } from "@fortawesome/free-solid-svg-icons";


const Nav = () => {
  return (
    <nav className="w-[750px] border mb-4 rounded-lg mt py-5 shadow-lg flex flex-row justify-between items-center border-neutral-300 max-w-7xl mt-5 px-10" style={{ backgroundColor: "#8f788d" }}>
      <div className="flex  flex-row gap-x-5">
        <img src="/logo.png" alt="My Image" className="w-15 h-10" />
        <h1 className="text-2xl"> Notes</h1>
      </div>
     
      <ul className="flex flex-row gap-x-5">
        <li>
          <Link to={"/"} className="text-2xl hover:text-pink-500">
            <FontAwesomeIcon icon={faHouse} className="text-[#e4d6da] text-2xl hover:text-gray-500" />
          </Link>
        </li>
        <li>
          {" "}
          <Link to={"/add-todo"} className="text-2xl hover:text-pink-500">
            <FontAwesomeIcon icon={faPlus} className="text-[#e4d6da] text-2xl hover:text-gray-500" />

          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;