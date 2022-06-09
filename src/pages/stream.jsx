import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import "../styles/homepage.css"
import "../root.css"
import "../styles/stream.css"
import { useState } from "react";
import { useVideo } from "../context/videoContext";
import { useAuth } from "../context/authContext";
import ReactPlayer from "react-player";

const Stream = () =>{
    const [sidebar, setSidebar] = useState(true);
    // const [ drop, setDrop ] = useState(false);
    const { token } = useAuth();
    const { videoState, getWatchLater, removeWatchLater, getLikes, removeLikes } = useVideo();
    const { videos, categories } = videoState;                           
   

const watchLaterHandler = (token, video) =>{
videoState.watchLater.some((item) => item._id === video._id) ?
removeWatchLater(token, video._id) : getWatchLater(token, video)
}


const likesHandler = (token, video) =>{
videoState.liked.some((item) => item._id === video._id) ?
removeLikes(token, video._id) : getLikes(token, video)
}

return (
<div className="App">
    <Navbar sidebar={sidebar} setSidebar={setSidebar} />
    <main className="main-cont">
        {sidebar ?
        <Sidebar /> : null}
        <div className="player-div"> 
            <ReactPlayer url="https://www.youtube.com/watch?v=JMNFWiEONfI" width="80%" height="450px"></ReactPlayer>
        </div>
    </main>
</div>
);
}

export { Stream }