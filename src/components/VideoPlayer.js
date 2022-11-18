import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

export default function App({ hash }) {
  console.log("https://sharetape.infura-ipfs.io/ipfs/" + hash);
  let url = "https://sharetape.infura-ipfs.io/ipfs/" + hash;
  return (
    <div
      style={{
        display: "flex",
        maxHeight: "60vh"
      }}
    >
      <Plyr
        source={{
          type: "video",
          title: "Example title",
          sources: [
            {
              src: url,
              type: "video/mp4",
            },
          ],
        }}
        options={{
          autoplay: true,
        }}
        autoPlay={true}
      />
    </div>
  );
}
