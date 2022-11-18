import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";
import Video from "../components/Video";
import getContract from "../utils/getContract";
import { Jazzicon } from "@ukstv/jazzicon-react";

export default function Channel() {
  const [videos, setVideos] = useState([]);
  const [AllVideos, setAllVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingArray, setLoadingArray] = useState(10);
  const [address, setAddress] = useState("");

  useEffect(() => {
    setAddress(getUrlVars()["address"]);
  }, []);

  const getUrlVars = () => {
    var vars = {};
    var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  };

  const getBlockChainData = async () => {
    setLoading(true);
    let contract = await getContract();
    let videosCount = await contract.videoCount();
    let channelAddress = getUrlVars()["address"];
    console.log(String(videosCount));
    let videos = [];
    for (var i = videosCount; i >= 1; i--) {
      let video = await contract.videos(i);
      if (channelAddress === video.author) {
        videos.push(video);
      }
    }
    setAllVideos(videos);
    setVideos(videos);
    setLoading(false);
  };

  const filterData = (e) => {
    let search = e;
    let filteredVideos = AllVideos.filter((video) => {
      return video.title.toLowerCase().includes(search.toLowerCase());
    });
    setVideos(filteredVideos);
  };

  const filterBasedOnCategory = (category) => {
    console.log(category);
    if (category === "All") {
      setVideos(AllVideos);
    } else {
      let filteredVideos = AllVideos.filter((video) => {
        return video.category.toLowerCase().includes(category.toLowerCase());
      });
      setVideos(filteredVideos);
    }
  };

  useEffect(() => {
    getBlockChainData();
  }, []);
  return (
    <div className="w-full flex flex-row">
      <Sidebar updateCategory={(category) => filterBasedOnCategory(category)} />
      <div className="flex-1 h-screen flex flex-col">
        <Header search={(text) => filterData(text)} />
        <div className="flex flex-row border-b-2 border-gray-500 text-white my-5 pl-5 pb-5">
          <div className="w-12 mr-5">
            <Jazzicon address={address} size={12} />
          </div>
          <div className="flex flex-col">
            <div>Videos by</div>
            <div>{address}</div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap">
          {videos.map((video) => (
            <Link to={`/video?id=${video.id}`}>
              <div className="w-80">
                <Video video={video} />
              </div>
            </Link>
          ))}

          {loading && (
            <div className="flex-1 flex flex-row flex-wrap">
              {Array(loadingArray)
                .fill(0)
                .map((_, index) => (
                  <div className="w-80">
                    <Loader />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const Loader = () => {
  return (
    <div className="flex flex-col m-5 animate-pulse">
      <div className="w-full bg-gray-300 dark:bg-borderGray h-40 rounded-lg "></div>
      <div className="w-50 mt-3 bg-gray-300 dark:bg-borderGray h-6 rounded-md "></div>
      <div className="w-24 bg-gray-300 h-3 dark:bg-borderGray mt-3 rounded-md "></div>
    </div>
  );
};
