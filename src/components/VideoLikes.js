import React, { useState, useEffect } from "react";
import likeImg from "../assets/like.png";
import dislikeImg from "../assets/dislike.png";
import { db } from "../utils/firebase";
import { update, ref, onValue } from "firebase/database";

const VideoLikes = ({ video }) => {
  let address = localStorage.getItem("walletAddress");
  const [totalLikes, setTotalLikes] = useState({});
  const [likeState, setLikeState] = useState({
    liked: false,
    disliked: false,
    address: address,
  });

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (
        data !== null &&
        data[video.hash] !== null &&
        data[video.hash] !== undefined &&
        data[video.hash].likes !== undefined
      ) {
        let videoData = data[video.hash];
        let total = videoData.likes
        setLikeState(total[address])
        setTotalLikes(videoData.likes);
      } else {
        setTotalLikes({});
      }
    });
  }, [video.hash]);

  const handleLike = (button) => {
    console.log(button);
    let liked = likeState.liked;
    let disliked = likeState.disliked;
    if (button === "like") {
      if (likeState.liked === true) {
        liked = false;
      } else {
        if (likeState.disliked === true) {
          disliked = false;
        }
        liked = true;
      }
    } else {
      if (likeState.disliked === true) {
        disliked = false;
      } else {
        if (likeState.liked === true) {
          liked = false;
        }
        disliked = true;
      }
    }

    const likeObject = {
      liked,
      disliked,
      address,
    };

    totalLikes[address] = likeObject;
    console.log(totalLikes);
    setTotalLikes(totalLikes);
    setLikeState(likeObject);
    writeToDb();
  };

  const writeToDb = () => {
    console.log("writedb", totalLikes);
    const hash = video.hash;
    update(ref(db, hash), {
      likes: totalLikes,
    });
  };

  return (
    <div className="flex space-x-5">
      <button>
        <img
          src={likeImg}
          onClick={() => handleLike("like")}
          alt="like"
          width={30}
          style={{ filter: `${likeState.liked ? "invert(100%)" : ""}` }}
        />
      </button>
      <button>
        <img
          src={dislikeImg}
          onClick={() => handleLike("dislike")}
          alt="dislike"
          width={30}
          style={{ filter: `${likeState.disliked ? "invert(100%)" : ""}` }}
        />
      </button>
    </div>
  );
};

export default VideoLikes;
