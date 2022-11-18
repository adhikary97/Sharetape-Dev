import React from "react";
import VideoPlayer from "./VideoPlayer";
import ChannelInfoInVideo from "./ChannelInfoInVideo";
import Video from "./Video";
import VideoComments from "./VideoComments";
import VideoLikes from "./VideoLikes";

const VIdeoComponent = ({ video }) => {
  console.log("Main VIdeo", video.title);
  return (
    <div>
      <VideoPlayer hash={video.hash} />
      <div className="flex justify-between flex-row py-4 border-borderWhiteGray dark:border-borderGray border-b-2">
        <div>
          <h3 className="text-2xl dark:text-white">{video.title}</h3>
          <div className="flex flex-row items-center space-x-60 text-gray-500 mt-1">
            <div>
              {video.category} • {video.date}
            </div>
            <VideoLikes video={video} />
          </div>
        </div>
      </div>
      <ChannelInfoInVideo video={video} />
      <VideoComments video={video} />
    </div>
  );
};

export default VIdeoComponent;
