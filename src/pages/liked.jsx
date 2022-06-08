import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import "../styles/homepage.css";
import "../root.css";
import { useState } from "react";
import { useVideo } from "../context/videoContext";
import { useAuth } from "../context/authContext";

const Liked = () =>{
    const [sidebar, setSidebar] = useState(true);
    const [ drop, setDrop ] = useState(false);
    const { token } = useAuth();

    const { videoState, removeLikes }  = useVideo()
    const { liked } = videoState;
        return (
        <div className="App">
            <Navbar sidebar={sidebar} setSidebar={setSidebar}/>
            <main className="main-cont">
                {sidebar ? <Sidebar/> : null}
                <div className="right-body">
                    <div className="chips">
                        <h2 className="page-name">Liked Videos</h2>
                    </div>
                    <div className="video-list">
                    {liked.map((video)=>(
                            <article className="video-card">
                            <img src={video.cover} alt="" className="card-img"/>
                             <div className="content">
                                 <div className="card-head">
                                     <p className="title">{video.title}</p>
                                     <span className="dp-span">{ drop === true ? (
                 <button className="dp-btn" onClick={()=> setDrop(false)}><i class="fas fa-ellipsis-h"></i></button> ) : 
                 ( <button className="dp-btn" onClick={()=> setDrop(true)}><i class="fas fa-ellipsis-v"></i></button> ) }</span>
                                 </div>
                                 
                 {drop? (
                     <ul className="dp-ul">
                 <li className="dp-item"><span><i className="fas fa-clock
                 card-icon"></i></span> Watch Later</li>
                 <li className="dp-item" onClick={()=>removeLikes(token, video._id)}><span><i className="fas fa-thumbs-up card-icon"></i></span> Unlike</li>
                 <li className="dp-item"><span><i className="fas fa-list card-icon"></i></span> Playlist</li>
                 </ul>
             ): null}
             
                                 <p className="creator">{video.creator}</p>
                                 <div className="views-date">
                                     <span className="views">{video.views}</span>
                                     <span className="date">{video.date}</span>
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
export { Liked }