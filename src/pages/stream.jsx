import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import "../styles/homepage.css"
import "../root.css"
import "../styles/stream.css"
import { useParams } from "react-router-dom";
import { useVideo } from "../context/videoContext";
import { useAuth } from "../context/authContext";
import ReactPlayer from "react-player";

const Stream = () =>{
const { token } = useAuth();
const { videoState, getWatchLater, removeWatchLater, getLikes, removeLikes } = useVideo();
const { videos } = videoState;
const { videoID } = useParams();

const videoExist = (id) =>{
const currentVideo = videos.find((video) => video._id === id)
return currentVideo;
}


const playingVideo = videoExist(videoID);

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
    <Navbar />
    <main className="main-cont">
        <div className="sidebar-cont">

            <Sidebar />
        </div>
        <div className="player-div">
            <ReactPlayer url={`https://www.youtube.com/watch?v=${videoID}`} controls={true} playing={true} width="80%"
                height="450px"></ReactPlayer>
            <div className="video-details">
                <div className="title-div">
                    <span className="vid-title">{playingVideo.title}</span>
                </div>
                <div className="det-div">
                    <span>{playingVideo.date}</span>
                    <span>{playingVideo.views}</span>
                </div>
                <div className="det-div">
                    <button className="dp-btn vid-btn" onClick={()=>likesHandler( token, playingVideo )}>{videoState.liked.some((item)=> item._id
                                === playingVideo._id) ?
                                <i className="fas fa-thumbs-up card-icon card-icon-green"> Liked</i> :
                                <i className="fas fa-thumbs-up card-icon"> Liked</i>
                                }</button>
                    <button className="dp-btn vid-btn" onClick={()=>watchLaterHandler( token, playingVideo )}>{
                                videoState.watchLater.some((item)=>item._id===playingVideo._id) ?
                                <i className="fas fa-clock card-icon card-icon-green"> Watch Later</i> :
                                <i className="fas fa-clock card-icon"> Watch Later</i>
                                }</button>
                    {/* <button className="dp-btn vid-btn" onClick={()=>likesHandler( token, playingVideo )}>{videoState.liked.some((item)=> item._id ===
                        playingVideo._id) ?
                        "Unlike" :
                        "Like"
                        }</button>
                    <button className="dp-btn vid-btn" onClick={()=>watchLaterHandler( token, playingVideo )}>{
                        videoState.watchLater.some((item)=>item._id===playingVideo._id) ?
                        "Undo Watch Later" :
                        "Watch Later"
                        }</button> */}
                </div>
            </div>
        </div>
    </main>
</div>
);
}

export { Stream }