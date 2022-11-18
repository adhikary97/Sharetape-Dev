import React from "react";
import { BiCheck } from "react-icons/bi";
import { Jazzicon } from "@ukstv/jazzicon-react";
import { Link } from "react-router-dom";

export default function ChannelInfoInVIdeo({ video }) {
  console.log("ChannelInfoInVIdeo", video);
  return (
    <div>
      <div className="flex mt-5 flex-row items-center ">
        <div className="w-12">
          <Link to={`/channel?address=${video.author}`}>
            <Jazzicon address={video.author} size={12} />
          </Link>
        </div>

        <div className="ml-3 flex flex-col">
          <p className="text-md font-bold flex items-center text-black dark:text-white mt-1">
            <Link to={`/channel?address=${video.author}`}>
              {video.author.slice(0, 13)}...{" "}
            </Link>
            <BiCheck size="20px" className="ml-1 fill-gray" />
          </p>
          <p className="text-sm flex items-center text-textSubTitle ">
            Video by {video.author}
          </p>
        </div>
      </div>
      <p className="text-sm text-white mt-4 ml-16">{video.description}</p>
    </div>
  );
}
