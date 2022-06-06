import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import "../styles/homepage.css"
import "../root.css"
import { useState } from "react";
import { useVideo } from "../context/videoContext";
import { useAuth } from "../context/authContext";
const Homepage = () =>{
    const [sidebar, setSidebar] = useState(true);
    const [ drop, setDrop ] = useState(false);
    const { token } = useAuth();
    const { videoState, getHistory } = useVideo();
    const { videos, categories } = videoState;
    console.log( videos, categories )
    return (
        <div className="App">
            <Navbar sidebar={sidebar} setSidebar={setSidebar}/>
            <main className="main-cont">
                {sidebar ? <Sidebar/> : null}
                <div className="right-body">
                    <div className="chips">
                        <ul className="category-list">
                            <li className="list-item">All</li>
                            {categories.map((category)=>(
                                <li className="list-item">{category.categoryName}</li>
                            ))}
                            
                            
                        </ul>
                    </div>
                    <div className="video-list">
                        {videos.map((video)=>(
                            <article className="video-card">
                            <img src={video.cover} alt="" className="card-img" onClick={()=>getHistory(token, video)}/>
                             <div className="content">
                                 <div className="card-head">
                                     <p className="title" onClick={()=>getHistory(token, video)}>{video.title}</p>
                                     <span className="dp-span">{ drop === true ? (
                 <button className="dp-btn" onClick={()=> setDrop(false)}><i class="fas fa-ellipsis-h"></i></button> ) : 
                 ( <button className="dp-btn" onClick={()=> setDrop(true)}><i class="fas fa-ellipsis-v"></i></button> ) }</span>
                                 </div>
                                 
                 {drop? (
                     <ul className="dp-ul">
                 <li className="dp-item"><span><i className="fas fa-clock
                 card-icon"></i></span> Watch Later</li>
                 <li className="dp-item"><span><i className="fas fa-thumbs-up card-icon"></i></span> Like</li>
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
export { Homepage }