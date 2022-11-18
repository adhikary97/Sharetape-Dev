import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import Toggle from "../utils/ThemeToggle";
import { Jazzicon } from "@ukstv/jazzicon-react";
export const Header = ({ search }) => {
  let address = localStorage.getItem("walletAddress");
  return (
    <header className="w-full flex justify-between h-20 items-center border-b p-4 border-borderWhiteGray dark:border-borderGray">
      <div className=" w-1/3	">
        <Link to="/home">
          <h1 className="text-white text-2xl">Sharetape</h1>
        </Link>
      </div>
      <div className=" w-1/3 flex justify-center items-center">
        {search ? (
          <input
            type="text"
            onChange={(e) => search(e.target.value)}
            placeholder="Type to search"
            className=" border-0  dark:bg-backgroundBlack  text-gray-600 focus:outline-none"
          />
        ) : null}
      </div>

      <div className=" w-1/3 flex justify-end">
        <Link to="/upload">
          <AiOutlinePlusCircle
            size="30px"
            className="mr-8 fill-whiteIcons dark:fill-white cursor-pointer"
          />
        </Link>
        <Toggle />

        <div className=" w-[30px] h-[30px] ml-8">
          <Jazzicon address={address} />
        </div>
      </div>
    </header>
  );
};
