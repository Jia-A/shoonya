import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { Link } from "react-router-dom"
import "../styles/homepage.css"
import "../root.css"
import { useState } from "react";
import { useVideo } from "../context/videoContext";
import { useAuth } from "../context/authContext";
import { useFilter } from "../context/filterContext";

const Homepage = () =>{
    const [sidebar, setSidebar] = useState(true);
    // const [ drop, setDrop ] = useState(false);
    const { token } = useAuth();
    const { videoState, getWatchLater, removeWatchLater, getLikes, removeLikes, getHistory } = useVideo();
    const { videos, categories } = videoState;    
    const { filterState, filterDispatch, filteredVideos } = useFilter();                       
   


const watchLaterHandler = (token, video) =>{
videoState.watchLater.some((item) => item._id === video._id) ?
removeWatchLater(token, video._id) : getWatchLater(token, video)
}


const likesHandler = (token, video) =>{
videoState.liked.some((item) => item._id === video._id) ?
removeLikes(token, video._id) : getLikes(token, video)
}

const playVideoHandler = (token, video) =>{
    getHistory(token, video)
    
}
return (
<div className="App">
    <Navbar sidebar={sidebar} setSidebar={setSidebar} />
    <main className="main-cont">
        {sidebar ?
        <Sidebar /> : null}
        <div className="right-body">
            <div className="chips">
                <ul className="category-list">
                    <li className="list-item" onClick={()=>filterDispatch({type : "CLEAR_FILTER", payload : {...filterState.allVideos}})}>All</li>
                    {categories.map((category)=>(

                    <li className="list-item" onClick={(e)=>filterDispatch({type : "CATEGORY", payload : category.categoryName})}>{category.categoryName}</li>

                    ))}
                </ul>
            </div> 
            <div className="video-list">

                {filteredVideos(videos, filterState).map((video)=>(
                <article className="video-card" key={video._id}>
                    <Link to={`/homepage/${video._id}`}>
                    <img src={video.cover} alt="" className="card-img" onClick={()=>getHistory(token, video)}/></Link>
                    <div className="content">
                        <div className="card-head">
                            <p className="title" onClick={()=>getHistory(token, video)}>{video.title}</p>
                            {/* <span className="dp-span">{ drop === true ? (
                                <button className="dp-btn" onClick={()=> setDrop(false)}><i
                                        class="fas fa-ellipsis-h"></i></button> ) :
                                ( <button className="dp-btn" onClick={()=> setDrop(true)}><i
                                        class="fas fa-ellipsis-v"></i></button> ) }</span> */}
                        </div>
                        <p className="creator">{video.creator}</p>
                        <div className="views-date">
                            <span className="views">{video.views}</span>
                            <span className="date">{video.date}</span>
                        </div>
                        <div className="card-icons">
                        <button className="dp-btn" onClick={()=>likesHandler( token, video )}><i className="fas fa-thumbs-up card-icon"></i>{videoState.liked.some((item)=> item._id === video._id) ?
                                "Unlike" :
                                "Like"
                                }</button>
                    <button className="dp-btn" onClick={()=>watchLaterHandler( token, video )}><i className="fas fa-clock card-icon"></i>{ videoState.watchLater.some((item)=>item._id===video._id) ?
                                "Undo Watch Later" :
                                "Watch Later"
                                }</button>
                    <button className="dp-btn"><i className="fas fa-list card-icon"></i>Playlist</button>
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

export { Homepage }