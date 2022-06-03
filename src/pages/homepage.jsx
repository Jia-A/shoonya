import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import "../styles/homepage.css"
import "../root.css"
import { useState } from "react";
const Homepage = () =>{
    const [sidebar, setSidebar] = useState(true);
    const [ drop, setDrop ] = useState(false);
    return (
        <div className="App">
            <Navbar sidebar={sidebar} setSidebar={setSidebar}/>
            <main className="main-cont">
                {sidebar ? <Sidebar/> : null}
                <div className="right-body">
                    <div className="chips">
                        <ul className="category-list">
                            <li className="list-item">All</li>
                            <li className="list-item">Stars</li>
                            <li className="list-item">Planets</li>
                            <li className="list-item">Nebula</li>
                        </ul>
                    </div>
                    <div className="video-list">
                        <article className="video-card">
                           <img src="images/universe-g276597298_1920.jpg" alt="" className="card-img"/>
                            <div className="content">
                                <div className="card-head">
                                    <p className="title">Video 1</p>
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
            
                                <p className="creator">By Jiya</p>
                                <div className="views-date">
                                    <span className="views">10k views</span>
                                    <span className="date">8 June, 2022</span>
                                </div>
                            </div>
                        </article>
                        
                    </div>
                </div>
            </main>
            
        </div>
    );
}
export { Homepage }