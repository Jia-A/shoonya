import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import "../styles/homepage.css";
import "../root.css";
import { useVideo } from "../context/videoContext";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
const History = () =>{
const { videoState, removeHistory, clearHistory, getLikes, removeLikes } = useVideo();
const { history } = videoState;
const { token } = useAuth();

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
        <div className="right-body">
            <div className="chips">
                <h2 className="page-name">History Page</h2>
                <button className="dp-btn clear" onClick={()=>clearHistory(token)}>Clear History</button>

            </div>
            <div className="video-list">
                {history.map((video)=>(
                <article className="video-card">
                    <Link to={`/homepage/${video._id}`}> <img src={video.cover} alt="" className="card-img"
                        onClick={()=>getHistory(token, video)}/></Link>
                    {/* <img src={video.cover} alt="" className="card-img" /> */}
                    <div className="content">
                        <div className="video-card-head">
                            <p className="title">{video.title}</p>
                        </div>
                        <p className="creator">{video.creator}</p>
                        <div className="views-date">
                            <span className="views">{video.views}</span>
                            <span className="date">{video.date}</span>
                        </div>
                        <div className="card-icons">
                            <button className="dp-btn" onClick={()=>likesHandler( token, video )}>{videoState.liked.some((item)=> item._id
                                === video._id) ?
                                <i className="fas fa-thumbs-up card-icon card-icon-green"> Liked</i> :
                                <i className="fas fa-thumbs-up card-icon"> Liked</i>
                                }</button>
                            <button className="dp-btn" onClick={()=>removeHistory( token, video._id )}>{
                                videoState.history.some((item)=>item._id===video._id) ?
                                <i className="fas fa-clock card-icon-green"> History</i> :
                                <i className="fas fa-clock card-icon"> History</i>
                                }</button>
                        </div>
                    </div>
                </article>
                ))}

            </div>
        </div>
    </main>

</div>
);
}
export { History }