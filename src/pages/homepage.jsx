import { Navbar } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import "../styles/homepage.css"
import "../root.css"
import { useState } from "react";
const Homepage = () =>{
    const [sidebar, setSidebar] = useState(true);
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
                                <p className="title">Video 1</p>
                                <p className="creator">By Jiya <span className="views">10k views</span></p>
                                
                                <div className="foot-icons">
                                    <button className="icon-item"><i className="fas fa-clock
                                    card-icon"></i></button>
                                    <button className="icon-item"><i className="fas fa-thumbs-up card-icon"></i></button>
                                    <button className="icon-item"><i className="fas fa-list card-icon"></i></button>
                                    
                                </div>
                            </div>
                        </article>
                        <article className="video-card">
                           <img src="images/universe-g276597298_1920.jpg" alt="" className="card-img"/>
                            <div className="content">
                                <p className="title">Video 1</p>
                                <p className="creator">By Jiya <span className="views">10k views</span></p>
                                
                                <div className="foot-icons">
                                    <button className="icon-item"><i className="fas fa-clock
                                    card-icon"></i></button>
                                    <button className="icon-item"><i className="fas fa-thumbs-up card-icon"></i></button>
                                    <button className="icon-item"><i className="fas fa-list card-icon"></i></button>
                                    
                                </div>
                            </div>
                        </article>
                        <article className="video-card">
                           <img src="images/universe-g276597298_1920.jpg" alt="" className="card-img"/>
                            <div className="content">
                                <p className="title">Video 1</p>
                                <p className="creator">By Jiya <span className="views">10k views</span></p>
                                
                                <div className="foot-icons">
                                    <button className="icon-item"><i className="fas fa-clock
                                    card-icon"></i></button>
                                    <button className="icon-item"><i className="fas fa-thumbs-up card-icon"></i></button>
                                    <button className="icon-item"><i className="fas fa-list card-icon"></i></button>
                                    
                                </div>
                            </div>
                        </article>
                        <article className="video-card">
                           <img src="images/universe-g276597298_1920.jpg" alt="" className="card-img"/>
                            <div className="content">
                                <p className="title">Video 1</p>
                                <p className="creator">By Jiya <span className="views">10k views</span></p>
                                
                                <div className="foot-icons">
                                    <button className="icon-item"><i className="fas fa-clock
                                    card-icon"></i></button>
                                    <button className="icon-item"><i className="fas fa-thumbs-up card-icon"></i></button>
                                    <button className="icon-item"><i className="fas fa-list card-icon"></i></button>
                                    
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