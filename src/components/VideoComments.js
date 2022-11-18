import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { set, update, ref, onValue } from "firebase/database";
import { Jazzicon } from "@ukstv/jazzicon-react";

const VideoComments = ({ video }) => {
  let address = localStorage.getItem("walletAddress");
  const [comment, setComment] = useState({ text: "", address: "" });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (
        data !== null &&
        data[video.hash] !== null &&
        data[video.hash] !== undefined &&
        data[video.hash].comments !== undefined
      ) {
        let videoData = data[video.hash];
        console.log(videoData);
        setComments(videoData.comments);
      } else {
        setComments([]);
      }
    });
  }, []);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  const handleComment = (e) => {
    setComment({
      text: e.target.value,
      address: address,
    });
  };

  const handlePost = () => {
    console.log("handlePost", comments);
    comments.push(comment);
    setComments(comments);
    writeToDb();
    setComment({ text: "", address: address });
  };

  const writeToDb = () => {
    console.log("writedb", comments);
    const hash = video.hash;
    update(ref(db, hash), {
      comments: comments,
      hash,
    });
  };

  return (
    <div className="mt-5">
      <h1 className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
        Comments
      </h1>
      <div className="mt-5">
        <input
          type="text"
          value={comment.text}
          onChange={handleComment}
          id="comment"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-inherit dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Comment..."
          required
        />
        <button
          type="button"
          onClick={handlePost}
          disabled={comment.text === ""}
          className="float-right text-gray-900 bg-white border focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-4 py-2 mr-2 mb-2 mt-3 bg-inherit dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Comment
        </button>
      </div>
      <div className="mt-5" style={{ marginTop: "80px" }}>
        {comments ? (
          comments.map((comment, id) => (
            <div
              key={id}
              className="block p-6 bg-inherit border-y border-gray-200 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="flex flex-row mb-2 text-xl tracking-tight text-gray-600 dark:text-white">
                <div className="w-12 pr-3 content-center">
                  <Jazzicon address={address} size={12} />
                </div>
                {comment.address.slice(0, 9)}...
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {comment.text}
              </p>
            </div>
          ))
        ) : (
          <h1>No comments yet!</h1>
        )}
      </div>
    </div>
  );
};

export default VideoComments;
